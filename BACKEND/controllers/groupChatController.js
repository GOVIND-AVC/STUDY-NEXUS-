const GroupChatSchema = require("../models/GroupChatMessage");

const getChatHistory=async(req,res)=>{
    try{

        const groupId=req.params
        const messages=await GroupChatSchema.findById({groupId}).sort({createdAt:-1})
        res.status(200).json({messages})
    }catch(err){
        console.log("Error fetching previous messages",err)
    }
};


module.exports={getChatHistory}
