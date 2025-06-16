// const express=require('express')
const express=require('express')
const { createGroup, getBrowseRequests, joinStudyGroupWithAI } = require('../controllers/studyGroupController')
const protectRoute = require('../middleware/authMiddleware')
const router=express.Router()

router.post('/create',protectRoute,createGroup)

router.get('/requests',protectRoute,getBrowseRequests)

router.post('/join/:groupId',protectRoute,joinStudyGroupWithAI)


module.exports=router   
