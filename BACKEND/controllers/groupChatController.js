const GroupChatSchema = require("../models/GroupChatMessage");
const User = require("../models/user");

const getChatHistory=async(req,res)=>{
    try{

        const groupId=req.params.groupId
        const messages=await GroupChatSchema.find({groupId}).sort({createdAt:1})
        res.status(200).json({messages})
    }catch(err){
        console.log("Error fetching previous messages",err)
    }
};



const sendMessage=async(req,res)=>{
    try {
    const { groupId } = req.params;
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const user=await User.findById(req.user._id)


    const newMessage = new GroupChatSchema({
        groupId,
        senderId: req.user._id,
        senderName:user.name,
        message,
    });

    const saved = await newMessage.save();
    res.status(201).json({ message: 'Message sent', chat: saved });
    } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports={getChatHistory,sendMessage}
