import React, { useState } from 'react'
import { IoMoonOutline } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const TopNavbar = ({heading}) => {
  const [closeUserModal, setCloseUserModal] = useState(true);
  const openUserModalHandler = ()=>{
    if(closeUserModal){
      setCloseUserModal(false);
    }
    else{
      setCloseUserModal(true);
    }
  }

  const navigate = useNavigate();
  const logoutHandler = ()=>{
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className='topnavbar'>
        <div>
            <h1>{heading}</h1>
        </div>
        <div>

          <div className='topnavbar__moon__belliconDiv'>
            <IoMoonOutline/>
            <CiBellOn/>
          </div>

          <div onClick={openUserModalHandler} className='topnavbar__usericons'>
              <FaRegUserCircle/>
              <IoIosArrowDown/>
              <div className={`userInfo ${closeUserModal?'userInfoClose':""}`}>
                <h2>Hi Aman!</h2>
                <button onClick={logoutHandler}>Logout</button>
              </div>
          </div>
        </div>
        <span></span>
    </div>
  )
}



export default TopNavbar
