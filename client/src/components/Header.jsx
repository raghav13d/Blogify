import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";




const Header=()=>{
  const {setUserInfo,userInfo,url}=useContext(UserContext);

  useEffect(()=>{
    fetch(url+'/profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo);
      })
    })
   },[]);

   function logout(){
    fetch(url+'/logout',{
      credentials:'include',
      method:'POST'
    })
    setUserInfo(null);

   }

   const username=userInfo?.username;
    return( 
        <header>
        <Link to='/' className='logo'>MyBlog</Link>
        <nav>  
          {username && (
            <>
              <span>Hello @{username}</span>
              <Link to="/create">Create new post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            </>
          )}
          
        </nav>
      </header>
    );
};

export default Header;