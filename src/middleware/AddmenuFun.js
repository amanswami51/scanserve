import {storage} from '../firebase'
import {uploadBytes, ref, getDownloadURL} from "firebase/storage";
const hostname = "https://scanserveapi-production.up.railway.app";
// const hostname = "http://localhost:5000"

const getItemsCall = async()=>{
    const response = await fetch(`${hostname}/api/admin/addmenu`, {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token': localStorage.getItem('token')
      }
    })
    const items = await response.json();
    return items;
}

const addItemsCall = async(newItemData, uploadItemPic)=>{
    //File upload to firebase/storage and get imageURL 
    const imgResponse = await uploadBytes(ref(storage, `itemsImg/${uploadItemPic.name}`), uploadItemPic);
    const imageURL = await getDownloadURL(imgResponse.ref);

    //Add the item to database
    const response = await fetch(`${hostname}/api/admin/addmenu`, {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token')
        },
        body:JSON.stringify({
            category:newItemData.category, 
            name:newItemData.name, 
            description:newItemData.description, 
            price:newItemData.price, 
            rating:newItemData.rating,
            itemPic:imageURL
        })
    })
    const x = await response.json();
    return x;
}

const updateItemsCall = async(id, newItemData, uploadItemPic)=>{
    //File upload to firebase/storage and get imageURL 
    const imgResponse = await uploadBytes(ref(storage, `itemsImg/${uploadItemPic.name}`), uploadItemPic);
    const imageURL = await getDownloadURL(imgResponse.ref);

    //Add the item to database
    const response = await fetch(`${hostname}/api/admin/addmenu/${id}`, {
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token')
        },
        body:JSON.stringify({
            category:newItemData.category, 
            name:newItemData.name, 
            description:newItemData.description, 
            price:newItemData.price, 
            rating:newItemData.rating,
            itemPic:imageURL
        })
    })
    const x = await response.json();
    return x;
}

const deleteItemCall = async(id)=>{
    const response = await fetch(`${hostname}/api/admin/addmenu/${id}`, {
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token')
        },
    })
    const x = await response.json();
    return x;
}
export {getItemsCall, addItemsCall, updateItemsCall, deleteItemCall};