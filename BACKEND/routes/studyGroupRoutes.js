// const express=require('express')
const express=require('express')
const { createGroup } = require('../controllers/studyGroupController')
const protectRoute = require('../middleware/authMiddleware')
const router=express.Router()

router.post('/create',protectRoute,createGroup)


module.exports=router   
