import React, { useEffect, useState } from 'react'
import { IoMoonOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { hostname } from '../Admin';

const TopNavbar = ({heading}) => {
  const [closeUserModal, setCloseUserModal] = useState(true);
  const openUserModalHandler = ()=>{
    setCloseUserModal(!closeUserModal)
  }

  const navigate = useNavigate();
  const logoutHandler = ()=>{
    const confirmation = window.confirm("Do you want to logout");
    if(confirmation){
      localStorage.removeItem('token');
      navigate('/');
    }
  }

  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode')?localStorage.getItem('darkMode'):'false');
  const setDarkModeHandler = ()=>{
    if(localStorage.getItem('darkMode')==='false'){
      setDarkMode('true');
      localStorage.setItem('darkMode', 'true');
    }else{
      setDarkMode('false');
      localStorage.setItem('darkMode', 'false');
    }
  }

  //GetUser
  const [user, setUser] = useState({})
  const getUserInformation = async()=>{
    const response = await fetch(`${hostname}/api/auth/user`, {
      method:"GET",
      headers:{
          'Content-Type':'application/json',
          'token':localStorage.getItem('token')
      },
    })
    const x = await response.json();
    if(x.success){
      setUser(x.userInfo)
    }
  }
  useEffect(()=>{
    getUserInformation();
  }, [])

  return (
    <div className='topnavbar'>
        <div>
            <h1>{heading}</h1>
        </div>
        <div>
          <div className='topnavbar__secondDiv_left'>
            {
              darkMode==='true'?<IoMoon onClick={setDarkModeHandler}/>:<IoMoonOutline onClick={setDarkModeHandler}/>
            }
          </div>
          <div onClick={openUserModalHandler} className='topnavbar__secondDiv_right'>
              <FaRegUserCircle/>
              <IoIosArrowDown/>
              <div className={`userInfo ${closeUserModal?'userInfoClose':""}`}>
                <h2>Hi {user.name}!</h2>
                <button onClick={logoutHandler}>Logout</button>
              </div>
          </div>
        </div>
    </div>
  )
}



export default TopNavbar
