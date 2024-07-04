import React, { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";

const LoginPage=()=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    const {setUserInfo}=useContext(UserContext);
    const {url} =useContext(UserContext);
    async function handleSubmit(ev){
        ev.preventDefault();
        const response=await fetch(url+'/api/user/login',{
        method:'POST',
        body:JSON.stringify({username,password}),
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        })
        if(response.ok){
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
                setRedirect(true);
            })
        }else{
            alert('wrong credentials');
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    return(
        <form className="login" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input 
                type="text"
                placeholder="username"
                value={username}
                onChange={ev=>setUsername(ev.target.value)}/>
            <input 
                type="text"
                placeholder="password"
                value={password}
                onChange={ev=>setPassword(ev.target.value)}/>
            <button>Login</button>
        </form >
    );
};

export default LoginPage;