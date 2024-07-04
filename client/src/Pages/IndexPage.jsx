import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import { UserContext } from "../userContext";

const IndexPage=()=>{
    const [posts,setPosts]=useState([]);
    const {url}=useContext(UserContext)
    useEffect(()=>{
        fetch(url+'/post').then(response=>{
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