import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import {hostname} from "../Admin"

const OwnerLogin = () =>{

    const [user, setUser] = useState({email:"", password:""});
    const handleOnChange = (e)=>{
        setUser({...user, [e.target.name]:e.target.value});
    }

    const navigate = useNavigate();
    const handleOnSubmit = async(e)=>{
        e.preventDefault();
        const res = await fetch(`${hostname}/api/owner/auth/login`, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email:user.email, password:user.password})
          });
          const x = await res.json();
      
          if(x.success){
            localStorage.setItem('ownerToken', x.ownerToken);
            toast.success("Owner Login successfully");
            navigate('/owner/ownercontrol');
          }else{
            toast.success(x.error);
        }
    }

  return (
    <div className='ownerLogin'>
        <form onSubmit={handleOnSubmit}>
            <h1>Let's Login</h1>
            <input type="email" value={user.email} name='email' onChange={handleOnChange} placeholder='Enter Email' required />
            <input type="password" value={user.password} name='password' onChange={handleOnChange} placeholder='Enter password' required />
            <p><Link to="/password/reset">Forget password?</Link></p>
            <button className='buttons' type="submit">Login</button>
        </form>
  </div>
  )
}

export default OwnerLogin
