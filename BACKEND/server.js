
const express=require('express')
const mongoose=require('mongoose')
const connectdb=require('./config/db')
const authRoutes=require('./routes/authRoutes')
const cors=require('cors')
const studyGroupRoutes=require('./routes/studyGroupRoutes')
const communityRoutes=require('./routes/communityRoutes');
const userRoutes=require('./routes/userRoutes')


require('dotenv').config()
const app=express()

const PORT=4500

app.use(express.json())
app.use(cors())
connectdb()

app.get('/',async (req,res)=>{
    await res.send("hello study nexus loading")
})


app.use('/api/auth',authRoutes)

app.use('/api/studygroup',studyGroupRoutes)

app.use('/api/community',communityRoutes);

app.use('/api/user',userRoutes)


app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})
