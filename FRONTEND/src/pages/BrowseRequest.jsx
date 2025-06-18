/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";

import axios from 'axios'

// import useNavigate from 'react-router-dom'


const BrowseRequests =()=>{

    const [allRequests,setAllRequests]=useState([])
    const [filters,setFilters]=useState({course:'',topic:''})
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)


    const fetchRequests=async()=>{
        try{

            setLoading(true);

            let query=[];
            
            if(filters.course)query.push(`course=${encodeURIComponent(filters.course)}`);
            if(filters.topic)query.push(`topic=${encodeURIComponent(filters.topic)}`)  

            const queryString =query.length?`?${query.join('&')}`:'';

            const token=localStorage.getItem('token');

            const response= await axios.get(`http://localhost:4500/api/studygroup/requests${queryString}`,
                {
                    headers:{
                        authorization:`Bearer ${token}`
                    }
                }
            );
            console.log(response.data)
            console.log('Type of data:', Array.isArray(response.data));
            setAllRequests(response.data.requests)
            setLoading(false);
        }catch(err){
            console.log('error fetching data',err)
            setError('Failed to load requests');
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const handleInputChange=(e)=>{
        setFilters({...filters,[e.target.name]:e.target.value});
    }

    const handleFilter=(e)=>{
        e.preventDefault();
        fetchRequests();
    };
    
    const [aiAnswers,setAiAnswers]=useState({})

    const handleAiInputChange=(id,value)=>{
        setAiAnswers(prev=>({
            ...prev,
            [id]:value
        }))
    }

    
    const handleJoingroup=async(groupid)=>{
        const userAnswer=aiAnswers[groupid];
        const token=localStorage.getItem('token');

        if(!userAnswer || userAnswer.trim().length===0){
            alert("To join the group you have to answer this question")
            return
        }

        try{
            const res=await axios.post(`http://localhost:4500/api/studygroup/join/${groupid}`,{
                aiAnswer:userAnswer
            },{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            alert(res.data.message +`\nScore: ${res.data.score}`)

        }catch(err){
            if(err.response?.data?.score!==undefined){
                alert(`${err.response.data.message}\nScore: ${err.response.data.score}`);
            }
            else{
                alert("Failed to join group: " + err.response?.data?.error || "Unknown error");
            }
        }

        console.log("Joining group ID:",groupid);
        console.log("The answer Entered is ",userAnswer)
    }






return(
    <div className="p-4">
        <h2>Browse Study Requests</h2>

        <form onSubmit={handleFilter} className="mb-4">

            <input type="text" name="course" value={filters.course} onChange={handleInputChange} placeholder="Filter by Course" />
            <input type="text" name="topic" value={filters.topic} onChange={handleInputChange} placeholder="Filter by Topic"/>

            <button type="submit">APPLY FILTERS</button>

        </form>


    {loading && <p>Loading requests ...</p>}
    {error && <p className="text-red-500">{error}</p>}

    <div className="grid-gap-4">
        {allRequests.length===0?
        <p>No active requests found</p>:(
            
            allRequests.map((req)=>(
                <div key={req._id} className="p-4 border rounded shadow">

                <h3>Course :{req.course}</h3>
                <p>Topic :{req.topic}</p>
                <p>Study Goal: {req.studygoal}</p>
                <p>Knowledge Level: {req.knowledgelevel}</p>
                <p>Study Mode: {req.studymode}</p>
                <p>Date: {req.date} | Time: {req.time}</p>
                <p>Location: {req.location}</p>
                <p>Language: {req.language}</p>
                <p>Members: {req.members.length} / {req.maxSize}</p>

                <p><strong>Additional Info : </strong>{req.additionalInfo}</p>
                <p><strong>AI QUESTION : {req.aiquestion}</strong></p>

                <textarea placeholder="Please enter your answer to the Question above" value={aiAnswers[req._id]||""}
                onChange={(e)=>handleAiInputChange(req._id,e.target.value)}
                />
                <button onClick={()=>handleJoingroup(req._id)}>JOIN GROUP</button>
            
            </div>
            
            ))
        )}
    </div>
    </div>
);
};
export default BrowseRequests