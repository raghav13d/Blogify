import React, { useState } from "react";
const API_BASE_URL = import.meta.env.BACKEND_URL

const RegisterPage=()=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    async function handleSubmit(ev){
        ev.preventDefault();
        const response=await fetch(`${API_BASE_URL}/register`,{
        method:'POST',
        body:JSON.stringify({username,password}),
        headers:{'Content-Type':'application/json'},
        })
        if(response.status===200){
            alert('registration successfull');
            
        }else{
            alert('registration failed');
        }
    }
    return(
        <form className="register" onSubmit={handleSubmit}>
            <h1>Register</h1>
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
            <button>Register</button>
        </form >
    );
};

export default RegisterPage;