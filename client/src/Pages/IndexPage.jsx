import React, { useEffect, useState } from "react";
import Post from "../components/Post";
const API_BASE_URL = import.meta.env.BACKEND_URL

const IndexPage=()=>{
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        fetch(`${API_BASE_URL}/post`).then(response=>{
            response.json().then(posts=>{
                setPosts(posts);
            });
        })
    },[])
    return(
        <>
            {posts.length>0 && posts.map(post=>(
                <Post {...post} />
            ))}
        </>
    );
};

export default IndexPage;