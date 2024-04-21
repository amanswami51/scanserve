import React, {useEffect, useRef, useState } from 'react'
import Card from "./Card";
import Sidebar from "../dashboard/Sidebar";
import TopNavbar from "../dashboard/TopNavbar";
import { IoMdAddCircle } from "react-icons/io";
import AddNewItemModal from './AddNewItemModal';
import { useDispatch, useSelector } from 'react-redux';
import { setAddmenuItems } from '../../redux/AddmenuItemsReducer';
import { getItemsCall } from '../../middleware/AddmenuFun';

const Addmenu = () =>{

  //Add new Items modal open settings
  const [openAddItem, setOpenAddItem] = useState(false);
  const openAddItemModalHandler = ()=>{
      setOpenAddItem(!openAddItem)
  }

  //Get AddmenuItems
  const dispatch = useDispatch();
  const getItems = async()=>{
    const items = await getItemsCall();
    dispatch(setAddmenuItems(items));
  }
  useEffect(()=>{
    getItems();
    // eslint-disable-next-line
  }, [])

  const {AddmenuItems} = useSelector((state)=>state.AddmenuItems);

  return (
    <div className='addmenu'>
        <Sidebar />
        <div>
            <TopNavbar heading="Add Menu"/>
            <div className='addmenu__cardsDiv'>
              {
                AddmenuItems.map((x, i)=>{
                  return <Card key={i} x={x} getItems={getItems}/>
                })
              }
              <p className='addmenu__addbutton'><IoMdAddCircle onClick={openAddItemModalHandler} title='Add New Item'/></p>
            </div>
          </div>
          <AddNewItemModal title="Add" onClick={openAddItemModalHandler} openModal={openAddItem} getItems={getItems} ref={useRef()}/>
    </div>
  )
}

export default Addmenu;

