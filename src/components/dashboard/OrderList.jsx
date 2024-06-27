import { useEffect, useState } from "react";
import { CurrentOrderApiCall } from "../../middleware/PlacedOrderFun";

const OrderList = ()=>{
    
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        setInterval(async()=>{
            const response =  await CurrentOrderApiCall();
            if(response.success){
                setOrders(response.orders)
            }
        }, 5000);
        // eslint-disable-next-line 
    }, [])
    
    return(
        <div className="orderlist">
            <h2>Order List</h2>
            <table>
                <tr>
                    <th>Sr</th>
                    <th>Table No</th>
                    <th>Food Items</th>
                    <th>Time</th>
                    <th>Amount</th>
                </tr>
                {
                    orders.map((x, i)=>{
                        return <tr key={i}>
                                <td>{i+1}</td>
                                <td>{x.tableNo}</td>
                                <td>
                                    {
                                        x.items.map((y, j)=>{
                                            return <span key={j}>{y.name}({y.cartQuantity}), </span>
                                        })
                                    }
                                </td>
                                <td>{convertGMTtoIST(x.date)}</td>
                                <td>{x.TotalPrice}&#8377;</td>
                            </tr>
                    })
                }
            </table>
        </div>
    )
}

const convertGMTtoIST = (gmtTime)=>{
    const gmtDate = new Date(gmtTime);
    const istOffset = -0.01 * 60 * 60 * 1000; 
    const istTime = new Date(gmtDate.getTime() + istOffset);
    const hours = istTime.getHours()>12?istTime.getHours()-12:istTime.getHours();
    const minutes = istTime.getMinutes();
    const seconds = istTime.getSeconds();
    const date = istTime.getDate();
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[istTime.getMonth()];
    const timeString = `${hours}:${minutes}:${seconds}, ${date}-${month}`;
    return timeString;
}

export default OrderList;
export {convertGMTtoIST};