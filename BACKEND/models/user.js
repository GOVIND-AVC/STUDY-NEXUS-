const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userid:{
        type:Number,
        required:true,
        unique:true
    },
    dob:{
        type:Date,
        required:true,
    },
    number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    accomodation:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdat:{
        type:Date,
        default:Date.now
    }
})


module.exports =mongoose.model("User",userschema)