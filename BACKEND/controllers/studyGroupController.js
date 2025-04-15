const StudyGroup = require("../models/StudyGroup");

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
            members:JSON.stringify([req.user._id])
        })

        const savedGroup= await newGroup.save()
        res.status(201).json({message:"Group Created Successfully",group:savedGroup})

    }catch(err){
        console.log("Erro creating Group",err)
        res.status(500).json({message:"Server error : Could not create group",error:err.message})
    }
}


module.exports={createGroup}