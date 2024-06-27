import React from 'react'
import { Outlet } from 'react-router-dom';

const Owner = () => {
    const isLoggedIn = localStorage.getItem('ownerToken')?true:false;
    if(isLoggedIn){
        return <Outlet />
    }else{
        return <div>Owner required to login Before access this route</div>
    }
}

export default Owner
