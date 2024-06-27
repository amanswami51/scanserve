import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {hostname} from "../Admin";
import { Link, useNavigate } from 'react-router-dom';
import scanservelogo from "../../extra/scanservelogo.png";
import { TbLogout } from "react-icons/tb";

const OwnerControl = () =>{

    const [newUserInfo, setNewUserInfo] = useState({name:"", email:"", password:""});
    const NewUserInfoOnChangeHadler = (e)=>{
        setNewUserInfo({...newUserInfo, [e.target.name]:e.target.value})
    }

    const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
    const openaCreateUserModalHandler = ()=>{
        setOpenCreateUserModal(!openCreateUserModal);
    }

    //get all users information 
    const [Users, setUsers] = useState([]);
    const getAllUserInfo = async()=>{
        const res = await fetch(`${hostname}/api/owner/get/allUserInfo`, {
            method:'GET',
            headers:{'Content-Type':'application/json'},
          });
        const x = await res.json();
        if(x.success){
            setUsers(x.user);
        }
    }
    useEffect(()=>{
        getAllUserInfo();
    }, [])

    //Create new user
    const createNewUserHandler = async(e)=>{
        e.preventDefault();
        const res = await fetch(`${hostname}/api/auth/register`, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({name:newUserInfo.name, email:newUserInfo.email, password:newUserInfo.password})
          });
          const x = await res.json();
      
          if(x.success){
            toast.success("New User Created successfully");
            getAllUserInfo();
          }else{
            toast.success(x.error);
          }

        setOpenCreateUserModal(!openCreateUserModal);
    }

    //Logout the Owner
    const navigate = useNavigate();
    const LogoutOwnerHandler = (e)=>{
      e.preventDefault();
      const confirmation = window.confirm("Do you want to logout");
      if(confirmation){
        localStorage.removeItem('ownerToken');
        navigate('/owner/login');
      }
    }

  return (
    <div className='ownerControl'>
      <div className='ownerControl___header'>
          <img src={scanservelogo} alt="scanserve" />
          <TbLogout onClick={LogoutOwnerHandler}/>
      </div>
      <div className='OwnerControl__information'>
        <h1>User Informations</h1>
        <table>
            <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Share</th>
            </tr>
            {
                Users.map((y, i)=>{
                    return <tr key={i}>
                                <th>{i+1}</th>
                                <th>{y.name}</th>
                                <th>{y.email}</th>
                                <th>{extractDate(y.date)}</th>
                                <th><button className='buttons'><Link to={`mailto:${y.email}`} className='links' >Share</Link></button></th>
                            </tr>
                })
            }
        </table>
      </div>
      <div className='OwnerControl__createUser'>
        <button onClick={openaCreateUserModalHandler} className='buttons'>Create New user</button>
        <form className={`${openCreateUserModal?"showForm":""}`}>
            <h2>Create New User</h2>
            <input type="text" name='name' onChange={NewUserInfoOnChangeHadler} placeholder='Enter your name' required/>
            <input type="email" name='email' onChange={NewUserInfoOnChangeHadler} placeholder='Enter your Email' required/>
            <input type="password" name='password' onChange={NewUserInfoOnChangeHadler} placeholder='Enter a strong password' required/>
            <div>
                <button className='buttons' onClick={createNewUserHandler}>Create</button>
                <button className='buttons' onClick={openaCreateUserModalHandler}>Close</button>
            </div>
        </form>
      </div>

    </div>
  )
}

const extractDate = (d)=>{
    const x = new Date(d);
    const date = x.getDate();
    const month = x.getMonth();
    const year = x.getFullYear();
    return `${date}-${month}-${year}`
}

export default OwnerControl
