import React from 'react';
import menufirst_usermode from "../../extra/menufirst_usermode.png";
import { Link, useParams } from 'react-router-dom';

const MenuFirstPage = ()=>{
  const { table, token } = useParams();
  localStorage.setItem('table', table);
  localStorage.setItem('token', token);
  return (
    <div className='menuFirstPage'>
      <img src={menufirst_usermode} alt="loading..." />
      <div>
        <h1>Enjoy</h1>
        <h1>Your Food</h1>
      </div>
      <Link to="/user/foodmenu">Get Started</Link>
    </div>
  )
}

export default MenuFirstPage
