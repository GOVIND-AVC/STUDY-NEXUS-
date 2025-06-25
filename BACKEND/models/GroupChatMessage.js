const mongoose=require('mongoose')

const groupchatschema=new mongoose.Schema({
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'StudyGroup',
        required:true
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    senderName:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const GroupChatSchema=mongoose.model('GroupChatSchema',groupchatschema)
module.exports=GroupChatSchema
