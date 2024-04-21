import React from 'react'
import { Outlet } from 'react-router-dom';

const Admin = () =>{
    const isLoggedIn = localStorage.getItem('token')?true:false;
    if(isLoggedIn){
        return <Outlet />
    }else{
        return <div>Please Buy Subscription Before access this route</div>
    }
}

export default Admin;
