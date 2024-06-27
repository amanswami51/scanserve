import React, { useRef, useState } from 'react';
import AddNewItemModal from './AddNewItemModal';
import toast from 'react-hot-toast';
import { deleteItemCall } from '../../middleware/AddmenuFun';

const Card = ({x, getItems}) => {

  //AddNewItemModal component fuction access
  const accessAddNewItemRef = useRef();

  //Update Items modal open settings
  const [openUpdateItem, setOpenUpdateItem] = useState(false);
  const openUpdateModalHandler = ()=>{
    setOpenUpdateItem(!openUpdateItem);
    accessAddNewItemRef.current.setDataToUpdateInputFields();
  }


  //Delete button functionality
  const deleteItems = async(id)=>{
    if(!window.confirm("Do you want to delete this Item?")){
      return ;
    }
    const x = await deleteItemCall(id);
    if(x.success){
      toast.success(`Id:${id}, Item is deleted successfully`)
    }else{
      toast.success(`Id:${id}, Item is not deleted`)
    }
    getItems();
  }
  return (
    <div className='card'>
        <div>
            <img src={x.itemPic} alt="Loading..." />
        </div>
        <div>
            <h3>{x.name}</h3>
            <h4>&#8377;{x.price}</h4>
            <div>
                <button onClick={openUpdateModalHandler}>Edit</button>
                <button onClick={()=>{deleteItems(x._id)}}>Delete</button>
            </div>
        </div>
        <AddNewItemModal title="Update" onClick={openUpdateModalHandler} openModal={openUpdateItem} getItems={getItems} x={x} ref={accessAddNewItemRef}/>
    </div>
  )
}

export default Card