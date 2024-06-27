import React, { useState } from 'react'
import { PreviousOrderApiCall } from '../../middleware/PlacedOrderFun';
import {convertGMTtoIST} from "./OrderList";

const OrderHistory = () => {
    const [dateInterval, setDateInterval] = useState({start:"", end:""})
    const dateOnchangeHadler = (e)=>{
        setDateInterval({...dateInterval, [e.target.name]:e.target.value})
    }

    const [previousOrder, setPreviousOrder] = useState([]);
    const FindPreviousOrderHander = async(e)=>{
        e.preventDefault();
        const response = await PreviousOrderApiCall(dateInterval);
        if(response.success){
            setPreviousOrder(response.orders);
        }
    }
  return(
    <div className='orderHistory'>
        <div className='orderHistory__heading'>
            <h2>Previous Order List</h2>
            <div>
                <p>Date From-To : </p>
                <form>
                    <input type="date" name='start' onChange={dateOnchangeHadler}/>-
                    <input type="date" name='end' onChange={dateOnchangeHadler}/>
                    <button className='buttons' onClick={FindPreviousOrderHander}>Search</button>
                </form>
            </div>
        </div>
        <table>
            <tr>
                <th>Sr</th>
                <th>Table No</th>
                <th>Food Items</th>
                <th>Time</th>
                <th>Amount</th>
            </tr>
            {
                previousOrder.map((x, i)=>{
                    return <tr key={i}>
                            <td>{i+1}</td>
                            <td>{x.tableNo}</td>
                            <td>
                                {
                                    x.items.map((y, j)=>{
                                        return <span key={j}>{y.name}({y.cartQuantity}), </span>
                                    })
                                }
                            </td>
                            <td>{convertGMTtoIST(x.date)}</td>
                            <td>{x.TotalPrice}&#8377;</td>
                        </tr>
                })
            }
        </table>
    </div>
  )
}

export default OrderHistory
