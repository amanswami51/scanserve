import React from 'react';
import OrderList from './OrderList';
import TopNavbar from './TopNavbar'
import Sidebar from './Sidebar'

const Dashboard = () =>{

  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='dashboard__right'>
        <TopNavbar heading="Dashboard"/>
        <div className='dashboard__orderlist'>
          <OrderList/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
