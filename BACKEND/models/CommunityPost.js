const mongoose=require('mongoose')

const communityPostSchema=new  mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    username:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:[String],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
});


const CommunityPost=mongoose.model('CommunityPost',communityPostSchema)
module.exports=CommunityPost