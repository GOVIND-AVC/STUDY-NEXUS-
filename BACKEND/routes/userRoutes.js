const express=require('express')
const { getProfileSummary } = require('../controllers/userController')
const protectRoute = require('../middleware/authMiddleware')
const router=express.Router()

router.get('/profile-summary',protectRoute,getProfileSummary)

module.exports=router;

