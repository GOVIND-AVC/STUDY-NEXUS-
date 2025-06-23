const User=require('../models/user')
const StudyGroup=require('../models/StudyGroup')

const getProfileSummary=async(req,res)=>{
    try{
        const userId=req.user._id;

        const user=await User.findById(userId).select(
            'name email userid number course year accomodation hostelDetails'
        )

        if(!user){
            return res.status(404).json({error:"User not found"})
        }

        const activeRequests=await StudyGroup.find({
            createdby:userId,
            status:'active'
        }).lean()

        const pastRequests=await StudyGroup.find({
            createdby:userId,
            status:{$ne:'active'}
        })

        const joinedGroups=await StudyGroup.find({
            members:userId,
            status:'active'
        })
        .populate('createdby','name')
        .lean()

        const pastJoinedGroups=await StudyGroup.find({
            members:userId,
            status:{$ne:'active'}
        })
        .populate('createby','name')
        .lean()
        
        res.status(200).json({
            userInfo:user,
            activeRequests,
            pastRequests,
            joinedGroups,
            pastJoinedGroups
        })
    }catch(err){
        console.log("Error fetchin User Profile",err)
        res.status(500).json({error:"Server error while  loading profile summary"})
    }
}


module.exports={getProfileSummary}

