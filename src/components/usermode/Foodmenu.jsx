import React, { useEffect } from 'react';
import scanservelogo from "../../extra/scanservelogo.png"
import { IoIosSearch } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { IoMdCart } from "react-icons/io";
import { IoRestaurantSharp } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setItem } from '../../redux/ItemDetailInfoReducer'; 
import { useDispatch, useSelector } from 'react-redux';
import { getItemsUserModeCall } from '../../middleware/GetItemUserMode';
import { setItems } from '../../redux/ItemsUserModeReducer';
import { getTotals, setCartItems } from '../../redux/CartItemsReducer';

const Foodmenu = () =>{
  const searchHandler = (e)=>{
    e.preventDefault();
    toast.success('Item search call successfully')
  }

   //call the middleware function, at "/api/customer/getitem", and set "Items" state to redux store.
  const dispatch = useDispatch();
  const getItemsUserSide = async()=>{
    const x = await getItemsUserModeCall();
    if(x.success){
      dispatch(setItems(x.items));
    }
  }

  
  useEffect(()=>{
      getItemsUserSide();
      // eslint-disable-next-line
    },[])
  
  //get items for customer ui from redux store
  const {Items} = useSelector((state)=>state.ItemsUserMode)

  //Get different categories from Items Data.
  const categorySet = new Set();
  Items.forEach(food => categorySet.add(food.category));
  const categories = Array.from(categorySet); //convert set to array

  return (
    <div className='foodmenu'>
      <div className='foodmenu__header'>
        <div>
          <img src={scanservelogo} alt="loading..." />
          <h1>SCAN SERVE</h1>
        </div>
        <form onSubmit={searchHandler}>
          <IoIosSearch/>
          <input type="text" placeholder='Search' />
        </form>
      </div>
      {
        categories.map((category, i)=>{
          const ItemsAccorCategory = Items.filter(x => x.category === category);
          return <ItemsSection key={i} ItemsAccorCategory={ItemsAccorCategory} category={category}/>
        })
      }
      <FooterUserMode />
    </div>
  )
}

const ItemsSection = ({ItemsAccorCategory, category})=>{
  return(
    <>
      <h2 className='foodmenu__popularItems_tag'>{category}</h2>
      <div className='foodmenu__popularItems'>
          {
            ItemsAccorCategory.map((item, i)=>{
              return <ItemsComponent key={i} item={item}/>
            })
          }
      </div>
    </>
  )
}

const ItemsComponent = ({item})=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //Render to '/user/itemdetailinfo' page
  const ItemDetailInfoPageOpenHandler = ()=>{
    navigate('/user/itemdetailinfo');
    dispatch(setItem(item));
  }
  
  //Item add to cart
  const addToCartHandler = (e)=>{
    e.preventDefault();
    dispatch(setCartItems({...item, cartQuantity:1}))
    dispatch(getTotals())
    toast.success(`${item.name} is added to cart`);
  }
  return(
    <div >
      <img src={item.itemPic} alt="loading..." onClick={ItemDetailInfoPageOpenHandler}/>
      <p>{item.name}</p>
      <div>
        <h3>&#8377;{item.price}</h3>
        <IoIosAddCircle onClick={addToCartHandler}/>
      </div>
    </div>
  )
}

export const FooterUserMode = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const gotoFoodmenuHandler = ()=>{
    navigate('/user/foodmenu')
  }
  const gotoCartHandler = ()=>{
    navigate('/user/cart')
  }
  const gotoYourOrderHandler = ()=>{
    navigate('/user/yourorder')
  }
  
  const {cartTotalQuantity} = useSelector((state)=>state.cartItems)
  return(
    <div className='footerUserMode'>
      <TiHome onClick={gotoFoodmenuHandler} style={{color:`${location.pathname==='/user/foodmenu'?"#462B9C":"gray"}`}}/>
      <IoRestaurantSharp onClick={gotoYourOrderHandler} style={{color:`${location.pathname==='/user/yourorder'?"#462B9C":"gray"}`}}/>
      <IoMdCart onClick={gotoCartHandler} style={{color:`${location.pathname==='/user/cart'?"#462B9C":"gray"}`}}/>
      <p>{cartTotalQuantity}</p>
    </div>
  )
}

export default Foodmenu;
