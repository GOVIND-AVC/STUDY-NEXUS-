const GroupChatSchema = require("../models/GroupChatMessage");
const StudyGroup=require('../models/StudyGroup')
const jwt=require('jsonwebtoken')
const User=require('../models/user');
const User = require("../models/user");

const setupChatSocket=(io)=>{
    io.on('connection',(socket)=>{
        console.log("Connection established");

        socket.on('join-room',({groupId,token})=>{
            try{
                const decoded = jwt.verify(token,process.env.SECRET_KEY)
                socket.userId=decoded.id;
                socket.groupId=groupId;
                socket.join(groupId);
                console.log(`User ${socket.userId} joined group ${groupId}`);
            }catch(err){
                console.log("Error sending message",err)
            }
        });

        socket.on('send-message',async({groupId,message,token})=>{
            try{

                const decoded=jwt.verify(token,process.env.SECRET_KEY)
                const user=await User.findById(decoded.id)

                const newMsg=new GroupChatSchema({
                    groupId,
                    senderId:user._id,
                    senderName:user.name,
                    message
                })
                
                await newMsg.save()

                io.to(groupId).emit("recieve-message",{
                    message:newMsg.message,
                    senderId:newMsg.senderId,
                    senderName:newMsg.senderName,
                    createdAt:newMsg.createdAt
                })

            }catch(err){
                console.log("Error sending message",err)
            }
        })
    })
}

module.exports=setupChatSocket;

