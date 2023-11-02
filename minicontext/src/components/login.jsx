import React from 'react'
import userContext from '../context/userContext'
import { useContext } from 'react'
import { useState } from 'react'
function Login() {
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const {setUser} = useContext(userContext);
    const handleSubmit = (e) =>{
        e.preventDefault();
        setUser({userName,password});
    } 
  return (
    <>
    <h1>Login</h1>
    <input 
        type="text"
        placeholder='username'
        value={userName}
        onChange={(e)=>setUserName(e.target.value)}
     />
     {" "}
     <input 
        type="password"
        placeholder='password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
     />
     {" "}
     <button onClick={handleSubmit}>Login!</button>
    </>
  )
}

export default Login