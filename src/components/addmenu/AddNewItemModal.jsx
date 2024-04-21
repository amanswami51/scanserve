import React, { forwardRef, useImperativeHandle, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdClose } from "react-icons/io";
import { addItemsCall, updateItemsCall } from '../../middleware/AddmenuFun';

const AddNewItemModal = forwardRef(({title, onClick, openModal, getItems, x}, ref) => {

  //get input from form
  const [newItemData, setNewItemData] = useState({category:"", name:"", description:"", price:"", rating:""})
  const [uploadItemPic, setUploadItemPic] = useState(null);
  const onChangeHandler = (e)=>{
    setNewItemData({...newItemData, [e.target.name]:e.target.value})
  }

  //Add New Item function
  const AddNewItem = async()=>{
    const y = await addItemsCall(newItemData, uploadItemPic); //call the the admin/addmenu route
    if(y.success){
      toast.success("New Item is added successfully")
    }else{
      toast.success("New Item Not added")
    }
    setNewItemData({category:"", name:"", description:"", price:"", rating:""});
    setUploadItemPic(null);
    onClick(); //this close the modal after Adding
    getItems();
  }

  //Update Item function
  const UpdateItem = async()=>{
    const y = await updateItemsCall(x._id, newItemData, uploadItemPic);
    if(y.success){
      toast.success("Item is Update successfully")
    }else{
      toast.success("Item is Not Updated")
    }
    onClick(); //this close the modal after Updating
    getItems();
  }

  //access the functions of child component by the parent component
  useImperativeHandle(ref, ()=>({

    setDataToUpdateInputFields(){
      setNewItemData({
        category:x.category, 
        name:x.name, 
        description:x.description, 
        price:x.price, 
        rating:x.rating
      })
    }
    
  }))
  
  return (
    <div className={`addNewItemModal ${openModal?'addmenuDisplay':''}`}>
      <h2>{title} Item</h2>
      <form>
        <input type="text" value={newItemData.category} onChange={onChangeHandler} name="category" placeholder='Enter item category eg. Pizza, Burger' />
        <input type="text" value={newItemData.name} onChange={onChangeHandler} name="name" placeholder='Enter item name eg. garlic-pizza' />
        <textarea name="description" value={newItemData.description} onChange={onChangeHandler} placeholder="Enter the item detail" id="description" cols="30" rows="5"></textarea>
        <input type="number" value={newItemData.price} onChange={onChangeHandler} name="price" placeholder='Enter item price' />
        <input type="number" value={newItemData.rating} onChange={onChangeHandler} name="rating" placeholder='Enter item rating eg 4.8' />
        <input type="file" name='file' onChange={(e)=>{setUploadItemPic(e.target.files[0])}}/>
        <p onClick={()=>{title==="Add"?AddNewItem():UpdateItem()}}>Submit</p>
        <IoMdClose onClick={onClick} title={`Close ${title} Item Modal`}/>
      </form>
    </div>
  )
})

export default AddNewItemModal
