import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {hostname} from "./Admin";

function Login(){
  //get data from form
  const [text, setText] = useState({email:"", password:""})
  const handleOnChange = (e)=>{
    setText({...text, [e.target.name]:e.target.value})
  }

  const navigate = useNavigate();
  const handleOnSubmit = async(e)=>{
    e.preventDefault();

    const res = await fetch(`${hostname}/api/auth/login`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email:text.email, password:text.password})
    });
    const x = await res.json();

    if(x.success){
      localStorage.setItem('token', x.token);
      toast.success("Login successfully");
      navigate('/admin/dashboard');
    }else{
      toast.success(x.error);
    }

  }
 
  return (
    <div className='login'>
      <form onSubmit={handleOnSubmit}>
          <h1>Let's Login</h1>
          <input type="email" value={text.email} name='email' onChange={handleOnChange} placeholder='Enter Email' required />
          <input type="password" value={text.password} name='password' onChange={handleOnChange} placeholder='Enter password' required />
          <p><Link to="/password/reset">Forget password?</Link></p>
          <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
