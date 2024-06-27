import React from 'react'
import { FooterUserMode } from './Foodmenu';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import scanservelogo from "../../extra/scanservelogo.png";

const YourOrder = () =>{

    const {yourOrder} = useSelector((state)=>state.YourOrder)

    const clearOrderHistory = (e)=>{
        localStorage.removeItem('yourorder');
        window.location.reload();
    }

  return (
    <div className='yourorder'>
        {
            
            yourOrder.length===0?
            <div className='yourorder_isEmpty'>
                <img src={scanservelogo} alt="logo is loading" />
                <h2>Your order is empty</h2>
                <h2>Please order the item first</h2>
                <Link to='/user/foodmenu'>Click here to see menu</Link> 
            </div>
            :
            <>
                <div className='orders'>
                    <h1>Your Orders</h1>
                    {
                        yourOrder.map((order, i)=>{
                            return <Order order={order} key={i}/>
                        })
                    }
                </div>
                <button onClick={clearOrderHistory}>Clear Order History</button>
                <FooterUserMode />
            </>
        }
    </div>
  )
}


const Order = ({order})=>{
    return(
        <div className='order'>
            <p>
                <p>Table No : </p>
                <h2>{order.tableNo}</h2>
            </p>
            <p>
                <p>Total Price : </p>
                <h2>{order.TotalPrice}&#8377;</h2>
            </p>
            <p>
                <p>Date : </p>
                <h2>{order.date}</h2>
            </p>
            {
                order.items.map((item, j)=>{
                    return <Items item={item} key={j}/>
                })
            }

        </div>
    )
}

const Items = ({item})=>{
    return(
        <div className='items'>
           <img src={item.itemPic} alt="loading..." />
            <div>
                <p>{item.name}</p>
                <p>Price : {item.price}&#8377;</p>
                <p>Quantity : <b>{item.cartQuantity}</b></p>
                <h3>Total : <b>{item.price*item.cartQuantity}&#8377;</b></h3>
            </div>
        </div>
    )
}

export default YourOrder
