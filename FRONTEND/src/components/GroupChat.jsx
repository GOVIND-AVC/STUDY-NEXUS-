/* eslint-disable no-unused-vars */
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import socket from '../utils/socket'

const GroupChat = ({groupId}) => {

    const[messages,setMessages]=useState([])
    const[newMsg,SetNewMsg]=useState('')
    const[loading,SetLoading]=useState(true)
    const token=localStorage.getItem('token')
    const bottomRef=useRef(null)


    useEffect(()=>{
        fetchMessages()

        socket.connect()
        socket.emit('join-room',{groupId,token})

        socket.on('recieve-message',(newMsg)=>{
            setMessages((prevMessages)=>{
                const alreadyExists=prevMessages.some(msg=>msg._id===newMsg._id)
                if(alreadyExists) return prevMessages;
                return[...prevMessages,newMsg]
            })
            // setMessages((prev)=>[...prev,message])
        })
        return()=>{
            socket.emit('leaveGroup',groupId);
            socket.disconnect()
        }
    },[groupId])

    useEffect(()=>{
          if(bottomRef.current){
            bottomRef.current.scrollIntoView({behavior:"smooth"})
        }
    },[messages])


    const fetchMessages=async()=>{
        try{
            const res=await axios.get(`http://localhost:4500/api/chat/history/${groupId}`,{
                headers:{authorization:`Bearer ${token}`}
            })
            setMessages(res.data.messages)
            SetLoading(false)
            scrollToBottom()
        }catch(err){
            console.log("Erro fetching message",err)

        }
    }

    const handleSend=async()=>{
        if(!newMsg.trim())return;
        try{
            const res=axios.post(`http://localhost:4500/api/chat/${groupId}`,{
                message:newMsg
            },{
                headers:{authorization:`Bearer ${token}`}
            })

            socket.emit('send-message',{
                groupId,
                message:newMsg,
                token
            })



            SetNewMsg('')
        }catch(err){
            console.log("Erro sending message",err)
        }
    }

    const scrollToBottom=()=>{
        bottomRef.current.scrollIntoView({behavior:'smooth'});
    };

  return (
    <div className="p-4 border rounded shadow max-w-xl mx-auto h-[400px] flex flex-col">
        <h2 className="text-lg font-bold mb-2">Group Chat</h2>

        <div className="flex-1 overflow-y-auto border p-2 mb-2 rounded bg-gray-100">
        {loading ?(
            <p>Loading messages</p>
        ):(
            messages.map((msg)=>(
                <div key={msg._id} className='mb-1'>
                    <strong>{msg.senderName || 'User'}  : </strong>{msg.message}
                </div>
            ))
        )}
        <div ref={bottomRef}></div>
        </div>

        <div className='flex gap-2'>
            <input type="text" value={newMsg} className='flex-1 border p-1 rounded' onChange={(e)=>SetNewMsg(e.target.value) } placeholder='Type you message'/>
            <button onClick={handleSend} className='bg-blue-500 text-white px-3 py-1 rounded'>SEND</button>
        </div>

    </div>
  )
}

export default GroupChat