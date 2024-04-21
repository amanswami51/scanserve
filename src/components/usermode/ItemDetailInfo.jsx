import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PiStarThin } from "react-icons/pi";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setCartItems } from '../../redux/CartItemsReducer';


const ItemDetailInfo = () =>{
    //Item get from store
    var {Item} = useSelector((state)=>state.ItemDetailInfo);

    //Go back to foodmenu page
    const navigate = useNavigate();
    const gobackHandler = ()=>{
      navigate('/user/foodmenu');
    }
    
    //Item add to cart
    const [cartQuantity, setCartQuantity] = useState(1);
    const dispatch = useDispatch();
    const addToCartHandler = (e)=>{
      e.preventDefault();
      dispatch(setCartItems({...Item, cartQuantity}))
      toast.success(`${Item.name} is added to cart`);
      navigate('/user/cart')
    }



  return (
    <div className='itemDetailInfo'>
      <div className='itemDetailInfo__firstSection'>
        <IoIosArrowBack onClick={gobackHandler}/>
        <img src={Item.itemPic} alt="loading..." />
      </div>
      <div className='itemDetailInfo__secondSection'>
        <div>
            <p>
              <PiStarThin /> 
              <h4>{Item.rating}</h4>
            </p>
            <h3>&#8377;{Item.price}</h3>
        </div>
        <div>
            <h3>{Item.name}</h3>
            <p>
                <IoIosRemoveCircleOutline disabled onClick={()=>{if(cartQuantity>1){setCartQuantity(cartQuantity-1)}}}/> 
                <h4>{cartQuantity}</h4>
                <IoIosAddCircleOutline onClick={()=>{setCartQuantity(cartQuantity+1)}}/>
            </p>
        </div>
        <p>{Item.description}</p>
        <button onClick={addToCartHandler}>Add to Cart</button>
      </div>
    </div>
  )
}


export default ItemDetailInfo
