/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserProfile = () => {
    
    const [profileData,setProfileData]=useState(null);
    const[loading ,setLoading]=useState(true);
    const[error,setError]=useState(null);


    const token=localStorage.getItem('token')

    useEffect(()=>{
        const fetchProfile=async()=>{
            try{
                const res=await axios.get("http://localhost:4500/api/user/profile-summary",{
                    headers:{authorization:`Bearer ${token}`}
                })
                setProfileData(res.data)
                setLoading(false)
            }catch(err){
                console.log("Error fetching profile details",err)
                setError("Failed to load profile")
                setLoading(false)
            }
        }
        fetchProfile();
    },[]);

    if(loading)return <p>Loading profile</p>
    if(error)return <p className='text-red-500'>{error}</p>
    if(!profileData) return <p>No Profile  Data</p>

    const {userInfo,activeRequests,pastRequests,joinedGroups,pastJoinedGroups}=profileData;

  return (
    <div className='p-4'>
        <h2>User Profile</h2>

        <div className='p-4 border rounded mb-4'>
            <h3>Profile Information</h3>
            <p><strong>NAME : </strong>{userInfo.name}</p>
            <p><strong>USERID : </strong>{userInfo.userid}</p>
            <p><strong>EMAIL : </strong>{userInfo.email}</p>
            <p><strong>NUMBER : </strong>{userInfo.number}</p>
            <p><strong>COURSE & YEAR : </strong>{userInfo.course} - {userInfo.year}</p>
            <p><strong>ACCOMODATION : </strong>{userInfo.accomodation}</p>
            {userInfo.accomodation === "Hostel" &&(
                <p><strong>HOSTEL DETAILS : </strong>{userInfo.hostelDetails}</p>
            )}
        </div>

        <div className='mb-4'>
            <h3>ACTIVE STUDY REQUESTS</h3>
            {activeRequests.length === 0 ?(
                <p>No Active requests</p>
            ):(
                activeRequests.map((req)=>(
                    <div key={req._id} className='border p-2 mb-2'>
                        <p><strong>Course : </strong>{req.course} | <strong>Topic : </strong>{req.topic}</p>
                        <p><strong>Date : </strong>{req.createdAt} | <strong>Time : {req.time}</strong></p>
                        <p><strong>Status : </strong> {req.status}</p>
                    </div>
                ))
            )}
        </div>
        
        <div className='mb-4'>
            <h3>PAST STUDY REQUESTS</h3>
            {pastRequests.length===0?(
                <p>No previous requests</p>
            ):(
                pastRequests.map((req)=>(
                    <div key={req._id} className='border p-2 mb-2'>
                        <p><strong>Course :</strong>{req.course} | <strong>Topic : </strong>{req.topic}</p>
                        <p><strong>Status : </strong>{req.status}</p>
                    </div>
                ))
            )}
        </div>


        <div className='mb-4'>
            <h3>JOINED GROUPS</h3>
            {joinedGroups.length===0?(
                <p>NOT JOINED IN ANY GROUPS</p>
            ):(
                joinedGroups.map((req)=>(
                    <div key={req._id} className='border p-2 mb-2'>
                        <p><strong>Course : </strong> {req.course} | <strong>Topic:</strong> {req.topic}</p>
                        <p><strong>Created by : </strong> {req.createdby?.name || "Unknown"}</p>
                        <p><strong>Study Mode : </strong> {req.studymode}</p>
                    </div>
                ))
            )}
        </div>


        <div className='mb-4'>

            <h3>PREVIOUSLY JOINED GROUPS</h3>
            {pastJoinedGroups.length===0?(
                <p>NO GROUPS JOINED EARLIER</p>
            ):(
                pastJoinedGroups.map((req)=>(
                    <div key={req._id} className='border p-2 mb-2'>
                        <p><strong>Course : </strong> {req.course} | <strong>Topic:</strong> {req.topic}</p>
                        <p><strong>Created by : </strong> {req.createdby?.name || "Unknown"}</p>
                        <p><strong>Status : </strong>{req.status}</p>
                    </div>
                ))
            )}

        </div>

    </div>
  )
}

export default UserProfile