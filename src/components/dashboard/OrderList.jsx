import { useEffect, useState } from "react";
import { GetOrderApiCall } from "../../middleware/PlacedOrderFun";

const OrderList = ()=>{
    
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        setInterval(async()=>{
            const response =  await GetOrderApiCall();
            if(response.success){
                setOrders(response.orders)
            }
        }, 5000);
        // eslint-disable-next-line 
    }, [])
    
    console.log(orders);

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
                                <td>{x.date}</td>
                                <td>{x.TotalPrice}&#8377;</td>
                            </tr>
                    })
                }
            </table>
        </div>
    )
}

export default OrderList;