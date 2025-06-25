const express=require('express')
const { getChatHistory } = require('../controllers/groupChatController')
const router=express.Router()
const protectRoute=require('../middleware/authMiddleware')

router.get('/history/:groupId',protectRoute,getChatHistory)

module.exports=router;
