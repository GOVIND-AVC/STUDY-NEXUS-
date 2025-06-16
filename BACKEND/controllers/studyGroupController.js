const StudyGroup = require("../models/StudyGroup");
const evaluateAiAnswer=require('../utils/evaluateAnswer')

const createGroup=async(req,res)=>{
    try{

        const {
            course,topic,studygoal,knowledgelevel,studymode,data,time,duration,location,maxSize,additionalInfo,aiquestion,language
        }=req.body

        if(!course || !topic || !knowledgelevel || !studymode){
            return res.status(400).json({message:"Please fill all the required fields"})
        }


        const newGroup=new StudyGroup({
            userId:req.user._id,
            course,topic,studygoal,knowledgelevel,studymode,data,time,duration,location,maxSize,additionalInfo,aiquestion,
            createdby:req.user._id,
            language,
            status:'active',
            members: [req.user._id]
        })

        const savedGroup= await newGroup.save()
        res.status(201).json({message:"Group Created Successfully",group:savedGroup})

    }catch(err){
        console.log("Erro creating Group",err)
        res.status(500).json({message:"Server error : Could not create group",error:err.message})
    }
}



const getBrowseRequests =async(req,res)=>{
    try{

        const {course,topic}=req.query;

        let query ={
            status:'active'
        }
            
        if(course)query.course= course;
        if(topic)query.topic=topic

        const groups=await StudyGroup.find(query).lean();

        const filteredGroups = groups.filter(group=>{
            const members = group.members || [];
            // const members=JSON.parse(group.members || '[]');
            return members.length < group.maxSize
        })

        res.status(200).json({requests:filteredGroups})
    }catch(err){
        console.log("error fetching brosswereq",err)
        res.status(500).json({message:"Failed to fetch the browsereq",error:err.message})
    }
}

const joinStudyGroupWithAI=async(req,res)=>{
    try{
        const userId=req.user._id
        const groupId=req.params.groupId
        const {aiAnswer}=req.body;

        if(!aiAnswer||aiAnswer.trim().length===0){
            return res.status(400).json({error:"Answer is required to join this group"})
        }

        const group=await StudyGroup.findById(groupId);
        if(!group){
            return res.status(404).json({error:"Study group not found"})
        }

        if(group.status!=="active"){
            return  res.status(400).json({error:"This group is no longer active"})
        }

        // let members=Array.isArray(group.members)?group.members:[];
        // if(members.includes(userId)){
        //     return res.status(400).json({error:"You are already a member of this group."})
        // }
        group.members = Array.isArray(group.members) ? group.members : [];
        if (group.members.some(member => member.equals(userId))) {
            return res.status(400).json({ error: "You are already a member of this group." });
        }

        if (group.members.length >= group.maxSize) {
            return res.status(400).json({ error: "This group has reached its maximum size." });
        }

        const score=await evaluateAiAnswer(group.aiquestion,aiAnswer)
        
        if (score === null) {
            return res.status(500).json({ error: "Failed to evaluate answer due to API error." });
        }

        if(score>=4){
            group.members.push(userId)
            // group.members=members
            await group.save()

            return res.status(200).json({
                message:"You have successfully joined the group",
                score,
                members:group.members
            })
        }else{
            return res.status(403).json({
                message:"Your answer should be better to join the group",
                score
            })
        }

    }
    catch(err){
        console.log('Joining group error',err);
        res.status(500).json({
            error:"Something went wrong while trying to join the group"
        })

    }
}



















module.exports={createGroup,getBrowseRequests,joinStudyGroupWithAI}