
const express=require('express')
const mongoose=require('mongoose')

require('dotenv').config()
const app=express()

const PORT=4500

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected database successfully")
})
.catch((err)=>{
    console.log("database connection failed",err)
})


app.get('/',async (req,res)=>{
    await res.send("hello study nexus loading")
})

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})
