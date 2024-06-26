import React, { useEffect } from 'react';
import {FooterUserMode} from '../usermode/Foodmenu';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { decreementCartItem, getTotals, increementCartItem, removeCartItems } from '../../redux/CartItemsReducer';
import { PlacedOrderApiCall } from '../../middleware/PlacedOrderFun';
import { setYourOrder } from '../../redux/YourOrderReducer';
import scanservelogo from "../../extra/scanservelogo.png";
import { createOrderAPICall, getRazorpayKeyAPICall, paymentVerificationAPICall } from '../../middleware/PaymentsFun';


const Cart = () =>{

    const {CartItems, cartSubTotalAmount} = useSelector((state)=>state.cartItems)

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getTotals());
    }, [CartItems, dispatch])

    const discount = cartSubTotalAmount*(5/100);
    const Total = cartSubTotalAmount-discount;

    //placed new order
    const navigate = useNavigate();
    const placeOrderHandler = async(TotalPrice)=>{
        const response1 = await createOrderAPICall(TotalPrice);
        const key = await getRazorpayKeyAPICall();

        var options = {
            key: key,
            amount: response1.order.amount,
            currency: "INR",
            name: "Scanserve", 
            description: "It is a self ordering system by using QR code",
            image: scanservelogo,
            order_id: response1.order.id, 
            handler: async function (response){
                const body = {...response,};
                const response3 = await paymentVerificationAPICall(body);
                if(response3.success){
                    const response2 = await PlacedOrderApiCall(TotalPrice);
                    dispatch(setYourOrder(response2.cartItemIsSaveOrNot));
                    toast.success("Item order successfully");
                    navigate('/user/yourorder')
                }
                else{
                    toast.error('Your order is reject');
                }
            },
            prefill: {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" 
            },
            notes:{
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

  return (
    <div className='cart'>
        {
            CartItems.length===0?
            <div className='cart_isEmpty'>
                <img src={scanservelogo} alt="logo is loading" />
                <h2>Your Cart is Empty</h2>
                <h2>Please add the item first</h2>
                <Link to='/user/foodmenu'>Click here to see menu</Link> 
            </div>
            :
            <>
                <h1>Your Cart Items</h1>
                <div className='cart__items'>
                    {
                        CartItems.map((x, i)=>{
                            return  <CartItem key={i} x={x}/>
                        })
                    }
                </div>
                <h2>Amount to pay</h2>
                <div className='price_information'>
                    <PriceInfo tag="Subtotal" price={cartSubTotalAmount}/>
                    <PriceInfo tag="Discount 5%" price={discount}/>
                    <PriceInfo tag="Total" price={Total}/>
                </div>   
                <div className='order__button'>
                    <button onClick={()=>{placeOrderHandler(Total)}}>Order</button>  
                </div>
                <FooterUserMode />
            </>
        }
    </div>
  )
}

const CartItem = ({x})=>{

    //Item delete from the cart
    const dispatch = useDispatch();
    const RemoveItemFromCartHandler = (id)=>{
        dispatch(removeCartItems(id))
        toast.error("Item remove from cart successfully");
    }
    const IncreementCartItemHandler = (id)=>{
        dispatch(increementCartItem(id))
    }
    const DecreementCartItemHandler = (id)=>{
        dispatch(decreementCartItem(id))
    }
    return(
        <div>
            <div>
                <span><img src={x.itemPic} alt="loading..." /></span>
                <div>
                    <p>{x.name}</p>
                    <h3>&#8377;{x.price}</h3>
                    <div>
                        <IoIosRemoveCircleOutline onClick={()=>{if(x.cartQuantity>1){DecreementCartItemHandler(x._id)}}}/> 
                        <h4>{x.cartQuantity}</h4>
                        <IoIosAddCircleOutline onClick={()=>{IncreementCartItemHandler(x._id)}}/>
                    </div>
                    <p>Total : <b>{x.price*x.cartQuantity}&#8377;</b></p>
                </div>
            </div>
            <RxCrossCircled onClick={()=>{RemoveItemFromCartHandler(x._id)}}/>
        </div>
    )
}

const PriceInfo = ({tag, price})=>{
    return(
        <div>
            <p>{tag}</p>
            <h3>&#8377;{price}</h3>
        </div>
    )
}



export default Cart
