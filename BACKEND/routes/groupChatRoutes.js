const express=require('express')
const { getChatHistory, sendMessage } = require('../controllers/groupChatController')
const router=express.Router()
const protectRoute=require('../middleware/authMiddleware')


router.get('/history/:groupId',protectRoute,getChatHistory)
router.post('/:groupId', protectRoute, sendMessage);
module.exports=router;
