import React, { useState } from 'react';
import OrderList from './OrderList';
import TopNavbar from './TopNavbar'
import Sidebar from './Sidebar'
import OrderHistory from './OrderHistory';

const Dashboard = () =>{
  const [historyBool, setHistoryBool] = useState(false);
  const HistoryButtonHandler = ()=>{
    setHistoryBool(!historyBool);
  }
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='dashboard__right'>
        <TopNavbar heading="Dashboard"/>
        <div className='dashboard__orderlist'>
          <OrderList/>
          {
            historyBool?
            <>
              <OrderHistory />
              <button className='buttons' onClick={HistoryButtonHandler}>Hide History</button>
            </>
            :
            <button className='buttons' onClick={HistoryButtonHandler}>Show History</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
