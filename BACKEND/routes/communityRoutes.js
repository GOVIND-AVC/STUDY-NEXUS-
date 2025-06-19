const express=require('express');
const { getAllPosts, createPost, toggleLike, getComments, addComment } = require('../controllers/communityController');
const protectRoute = require('../middleware/authMiddleware');

const router=express.Router();

router.post('/create',protectRoute,createPost)
router.get('/all',protectRoute,getAllPosts)
router.post('/like/:postId',protectRoute,toggleLike)
router.post('/comment/:postId',protectRoute,addComment)
router.get('/comments/:postId',protectRoute,getComments)

module.exports=router;
