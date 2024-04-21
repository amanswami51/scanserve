const hostname = "https://scanserveapi-production.up.railway.app";
// const hostname = "http://localhost:5000"

const getItemsUserModeCall = async()=>{
    const response = await fetch(`${hostname}/api/customer/getitem`, {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token': localStorage.getItem('token')
      }
    })
    const items = await response.json();
    return items;
}

export {getItemsUserModeCall};

