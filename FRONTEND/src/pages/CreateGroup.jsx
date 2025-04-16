/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import axios from 'axios'

// import {Navigate, useNavigate} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const CreateGroup =()=>{
    const navigate=useNavigate()

    const [formData,setFormData]=useState({
        course:'',
        topic:'',
        studygoal: '',
        knowledgelevel: '',
        studymode: '',
        date: '',
        time: '',
        duration: '',
        location: '',
        maxSize: 4,
        additionalInfo: '',
        aiquestion: '',
        language: ''
    });
    
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const token=localStorage.getItem("token");
            console.log(token);

            const response=await axios.post('http://localhost:4500/api/studygroup/create',formData,{
                headers:{
                    authorization: `Bearer ${token}`
                },
            })
            alert('Group Created Successfully')
            navigate('/home')
        }
        catch(err){
            console.log(err)
            alert('Error creating group!');
        }
    }


    return(
        <div className="p-4">
            <h2>Create A Study Group</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" name="course" value={formData.course} onChange={handleChange} placeholder="course" required/>
                <input type="text" name="topic" value={formData.topic} onChange={handleChange} placeholder="Topic" required />
                

            <select name="studygoal" value={formData.studygoal} onChange={handleChange}>
                <option value="">SELECT STUDY GOAL</option>
                <option value="Exam Prep">EXAM PREP</option>
                <option value="Project">PROJECT</option>
                <option value="Research">RESEARCH</option>
                <option value="Usual Prep">Usual Prep</option>
                <option value="Urgent Req">Urgent Req</option>
            </select>
            <select name="knowledgelevel" value={formData.knowledgelevel} onChange={handleChange} required>
                <option value="">Knowledge Level</option>
                <option value="New to the topic">New to the topic</option>
                <option value="Medium-level understanding">Medium-level understanding</option>
                <option value="High in-depth understanding">High in-depth understanding</option>
            </select>

            <select name="studymode" value={formData.studymode} onChange={handleChange} required>
                <option value="">Study Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
            </select>

            <input type="date" name="date" value={formData.date} onChange={handleChange} />
            <input type="time" name="time" value={formData.time} onChange={handleChange} />
            <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" />
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
            <input type="number" name="maxSize" value={formData.maxSize} onChange={handleChange} placeholder="Max Group Size" />
            <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} placeholder="Additional Info" />
            <input type="text" name="aiquestion" value={formData.aiquestion} onChange={handleChange} placeholder="AI Question for Matching" />
            <input type="text" name="language" value={formData.language} onChange={handleChange} placeholder="Language Preference" />


            <button type="Submit">CREATE GROUP</button>
            </form>
        </div>
    )
}


export default CreateGroup; 