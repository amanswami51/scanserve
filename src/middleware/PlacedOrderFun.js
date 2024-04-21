const hostname = "https://scanserveapi-production.up.railway.app";
// const hostname = "http://localhost:5000"

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

const GetOrderApiCall = async()=>{
    const response = await fetch(`${hostname}/api/customer/orders`,{
        methos:"GET",
        headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token'),
        }, 
    })

    const responseInJson = await response.json();
    return responseInJson;
}

export {PlacedOrderApiCall, GetOrderApiCall};