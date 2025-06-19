const Comment = require("../models/Comment");
const CommunityPost = require("../models/CommunityPost");

const createPost=async(req,res)=>{
    try{
        const {title,content,tags}=req.body;
        if(!title||!content){
            return res.status(400).json({error:"Both title and content are required"})
        }

        const newPost=new CommunityPost({
            userId:req.user._id,
            username:req.user.name,
            title,
            content,
            tags
        });

        const saved=await  newPost.save();
        res.status(201).json({message:"Post created succesfully",post:saved});
    }
    catch(err){
        console.log("Error creating post ",err)
        return res.status(500).json({error:"Server error creating post"});        
    }
}

const getAllPosts=async(req,res)=>{
    try{
        const {tag,sort}=req.query
        let filter={}

        if(tag)filter.tags=tag
        let sortOption={createdAt:-1};
        if(sort==='oldest')sortOption={createdAt:1};

        const posts=await CommunityPost.find(filter).sort(sortOption).lean();
        res.status(200).json({posts})
    }
    catch(err){
        console.log("Error fetching posts : ",err)
        res.status(500).json({error:"Failed to load community posts"})
    }
}

const toggleLike=async(req,res)=>{
    try{
        const postId=req.params.postId;
        const userId=req.user._id;

        const post=await CommunityPost.findById(postId)
        if(!post){
            return res.status(404).json({error:"Post not found"})
        }

        const liked=post.likes.includes(userId);
        if(liked){
            post.likes.pull(userId)
        }
        else{
            post.likes.push(userId)
        }

        await post.save()
        res.status(200).json({message:liked?"Post unliked":"Post liked",likesCount:post.likes.length})
    }
    catch(err){
        console.log("Error liking/disliking the post",err)
        res.status(500).json({error:"Error toggling like"})
    }
}

const addComment=async(req,res)=>{
    try{
        const postId=req.params.postId;
        const {commentText}=req.body

        if(!commentText || commentText.trim().length === 0){
            return res.status(400).json({error:"Comment cannot be empty"});
        }

        const comment=new Comment({
            postId,
            userId:req.user._id,
            username:req.user.name,
            commentText
        });

        const savedComment=await comment.save();
        return res.status(201).json({message:"Comment  added",comment:savedComment})
    }catch(err){
        console.log("Error adding comment",err)
        return res.status(500).json({Error:"Server error while adding comment"})
    }
}


const getComments=async(req,res)=>{
    try{
        const postId=req.params.postId;

        const comments=await Comment.find({postId}).sort({createdAt:1}).lean()
        res.status(200).json({comments})
    }
    catch(err){
        console.log("Error while fetching the comments")
        res.status(500).json({error:"Failed to load comments"})
    }
}


module.exports={
    createPost,
    getAllPosts,
    toggleLike,
    addComment,
    getComments
};






