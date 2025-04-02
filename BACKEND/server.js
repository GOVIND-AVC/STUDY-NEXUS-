
const express=require('express')
const mongoose=require('mongoose')
const connectdb=require('./config/db')

require('dotenv').config()
const app=express()

const PORT=4500

app.use(express.json())

connectdb()

app.get('/',async (req,res)=>{
    await res.send("hello study nexus loading")
})

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})
