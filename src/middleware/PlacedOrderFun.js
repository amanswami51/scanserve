import {hostname} from "../components/Admin";

const PlacedOrderApiCall = async(TotalPrice)=>{
    const response = await fetch(`${hostname}/api/customer/orders`, {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token'),
        },
        body:JSON.stringify({newOrder:JSON.parse(localStorage.getItem('CartItems')), table:localStorage.getItem('table'), TotalPrice})
    })

    const responseInJson = await response.json();
    return responseInJson;
}

//Get current orders
const CurrentOrderApiCall = async()=>{
    const response = await fetch(`${hostname}/api/admin/getOrders/current`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token'),
        }, 
    })

    const responseInJson = await response.json();
    return responseInJson;
}

//Get previous orders
const PreviousOrderApiCall = async(dateInterval)=>{
    const response = await fetch(`${hostname}/api/admin/getOrders/previous`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token'),
        }, 
        body:JSON.stringify(dateInterval),
    })

    const responseInJson = await response.json();
    return responseInJson;
}

export {PlacedOrderApiCall, CurrentOrderApiCall, PreviousOrderApiCall};