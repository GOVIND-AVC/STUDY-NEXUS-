const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CommunityPost',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    username:{
        type:String,
        required:true
    },
    commentText:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});



const Comment=mongoose.model('Comment',commentSchema)
module.exports=Comment
