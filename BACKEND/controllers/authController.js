const express=require('express')
const User=require('../models/user')
const generateToken=require('../utils/generateToken')

const signup=async(req,res)=>{
    try{
        const {name,userid,dob,number,email,accomodation,hostelDetails,course,year,password}=req.body;

        const existinguser =await User.findOne({$or:[{email},{userid}]})
        if(existinguser){
            return res.status(400).json({message:"User already exists please login"})
        }
        const newUser=new User({name,userid,dob,number,email,accomodation,hostelDetails,course,year,password});
        await newUser.save();
        const token=generateToken(newUser._id)
        res.status(201).json({
            message:"User created successfully",
            user:{name,email,userid},
            token
        })
    }
    catch(err){
        res.status(500).json({"error creating the account":err})
    }

}

module.exports={signup}