import {hostname} from "../components/Admin";

const createOrderAPICall = async(TotalPrice)=>{
    const response = await fetch(`${hostname}/api/customer/createOrder`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({amount:TotalPrice})
    })
    const x = await response.json();
    return x;
}

const getRazorpayKeyAPICall = async()=>{
    const response = await fetch(`${hostname}/api/customer/getkey`, {
        method:"GET",
    })
    const key = await response.json();
    return key;
}

const paymentVerificationAPICall = async(body)=>{
  const response = await fetch(`${hostname}/api/customer/paymentVerification`, {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(body)
  })
  const x = await response.json();
  return x;
}

export {createOrderAPICall, getRazorpayKeyAPICall, paymentVerificationAPICall};

