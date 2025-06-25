/*  eslint-disable no-unused-vars*/
import axios, { Axios } from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";


const CommunityPage=()=>{

    const [newPost,setNewPost]=useState({
        title:'',
        content:'',
        tags:''
    })
    const [posts,setPosts]=useState([]);
    const[filters,setFilters]=useState({tag:'',sort:'newest'})
    const [loading,setLoading]=useState(true);
    const[error,setError]=useState(null)
    const [expandedPostId,setExpandedPostId]=useState(null);
    const [comments,setComments]=useState({})
    const[commentInputs,setCommentInputs]=useState({})

    const token=localStorage.getItem('token')

    const fetchPost=async()=>{
        setLoading(true)
        try{
            const query=[]
            if(filters.tag)query.push(`tag=${filters.tag}`)
            if(filters.sort)query.push(`sort=${filters.sort}`)
            const queryString=query.length?`?${query.join('&')}`:''
            
            console.log(queryString)

            const res=await axios.get(`http://localhost:4500/api/community/all${queryString}`,{
                headers:{authorization:`Bearer ${token}`}
            })
            console.log(res)
            setPosts(res.data.posts);
            setLoading(false)
        }catch(err){
            console.log("Error fetching posts",err)
            setError('Failed to Load Posts')
            setLoading(false)
        }
    }

    const handleInputChange=(e)=>{
        setFilters({...filters,[e.target.name]:e.target.value})
    }

    const handleFilter=(e)=>{
        e.preventDefault()
        fetchPost();
    }


    const handleCreatePost=async(e)=>{
        e.preventDefault()
        try{
        
        const res=await axios.post('http://localhost:4500/api/community/create',{
            title:newPost.title,
            content:newPost.content,
            tags:newPost.tags.split(',').map((t)=>t.trim()).filter(Boolean)
        },{
            headers:{authorization:`Bearer ${token}`}
        })
        alert("Post created successfully")
        setNewPost({title:'',content:'',tags:''})
        fetchPost()
        }catch(err){
            console.log("Error creating Post",err)
            alert("Failed to create Post")
        }
    }

    const handlePostInputChange=(e)=>{
        const{name,value}=e.target
        setNewPost((prev)=>({
            ...prev,[name]:value
        }))
    }


    const handleLike=async(postId)=>{
        try{
            await axios.post(`http://localhost:4500/api/community/like/${postId}`,
                {},
                {
                headers:{authorization:`Bearer ${token}`}
            })
            fetchPost();
            console.log("liked")
        }catch(err){
            console.log("Error trying to like the post",err)
            alert("Failed to like post")
        }
    }


    const handleExpand=async(postId)=>{
        if(expandedPostId===postId){
            setExpandedPostId(null)
        }
        else{
            setExpandedPostId(postId)
        
        try{
            const res=await axios.get(`http://localhost:4500/api/community/comments/${postId}`,{
                headers:{authorization:`Bearer ${token}`}
            })
            setComments((prev)=>({...prev,[postId]:res.data.comments}))
        }catch(err){
            console.log("error")
            alert("Failed to load Comments")
        }
    }
    }

    const handleCommentChange=(postId,value)=>{
        setCommentInputs((prev)=>({
            ...prev,[postId]:value
        }))
    }

    const handleCommentSubmit=async(postId)=>{
        const text=commentInputs[postId];
        if(!text){
            return
        }
        try{
            await axios.post(`http://localhost:4500/api/community/comment/${postId}`,
                {commentText:text},
                {
                headers:{authorization:`Bearer ${token}`}
            })
            handleExpand(postId)
            setCommentInputs((prev)=>({...prev,[postId]:''}))
        }catch(err){
            alert("Failed to submit comment")
        }
    }

    useEffect(()=>{
        fetchPost()
    },[filters,token]);

    return(
        <div className="p-4">
            <h2>Community Page</h2>

            <h3>CREATE NEW POST</h3>

            <form onSubmit={handleCreatePost} className="mb-4">
                <input type="text" name="title" placeholder="post-title" value={newPost.title} onChange={handlePostInputChange} required />
                <br />
                <textarea name="content" placeholder="Whats on your mind" value={newPost.content} onChange={handlePostInputChange} required></textarea>
                <br />
                <input type="text" name="tags" placeholder="Tags (comma seperated)" value={newPost.tags} onChange={handlePostInputChange}/>
                <br />
                <button type="submit">Post</button>
            </form>







            <form onSubmit={handleFilter} className="mb-4">
                <input type="text" name="tag" placeholder="Enter filter tags" value={filters.tag} onChange={handleInputChange} />

                <select name="sort" value={filters.sort} onChange={handleInputChange}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>

                <button type="submit">Apply Filters</button>

            </form>

            {loading && <p> Loading Posts...</p>}
            {error && <p className="text-red-500">{error}</p>}


            {posts.map((post)=>(
                <div key={post._id} className="p-4 border rounded mb-4">
                    <h4>{post.userId?.name || 'Anonymous'} - {post.title}</h4>
                    <p>{post.content}</p>
                    <p>Tags :{post.tags?.join(',')}</p>

                    <button onClick={()=>handleLike(post._id)}>❤️Like</button>
                    <button onClick={()=>handleExpand(post._id)}>💬 Comments</button>

                    {expandedPostId ===post._id && (
                        <div className="mt-2">
                            {comments[post._id]?.map((c)=>(
                                <div key={c._id} className="p-2 border rounded mb-2">
                                    <strong>{c.userId?.name || "User"}:</strong>{c.commentText}
                                </div>
                                
                            ))}
    
                            <textarea placeholder="Write your comment" value={commentInputs[post._id] || "" } 
                                onChange={(e)=>handleCommentChange(post._id,e.target.value)}/>
                            
                            <button onClick={()=>handleCommentSubmit(post._id)}>Post Comment</button>

                        </div>
                    )}

                </div>
            ))}

        </div>
    )

}

export default CommunityPage