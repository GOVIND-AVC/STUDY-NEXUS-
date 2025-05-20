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
            
            </div>
            
            ))
        )}
    </div>
    </div>
);
};
export default BrowseRequests