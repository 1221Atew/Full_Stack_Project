import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AppDispatch, RootState } from "../../redux/store";
import fetchOrderData from "../../redux/thunks/orderThunk";
import "./Orders.css"

export default function Orders(){

    const isLoggedIn:boolean = JSON.parse(localStorage.getItem("LoginInfo")!)
    const orders = useSelector((state: RootState)=>state.orders.order)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
      if(isLoggedIn) {dispatch(fetchOrderData())};
      },[dispatch, isLoggedIn])
      
    return (
        <div className="order">
         {isLoggedIn? 
            <div className="sub-order">
                <div className="order-header"><h1>My orders({orders.length})</h1></div>
                {
                    orders.length > 0 ?
                        <div className="">
                            {
                                orders.map((items)=>{
                                    return <div className="my-orders">
                                        {items.productOrder.map((item)=>{
                                            return <div className="order-detail">
                                                <div>
                                                    <img src={item.image} alt="this is order" width="100px" height="100px"/>
                                                </div>
                                                <div>
                                                    <p>{item.title.slice(0,20)}</p>
                                                    <p>Quantity:{item.quantity}</p>
                                                    <p><strong>$</strong>{item.price}</p>
                                                </div>  
                                            </div>
                                        })}
                                    </div>
                                })
                            }
                        </div>
                    :
                    <div className="no-order">
                        <h1>
                            <Link to="/cart">Go</Link> to cart page if you want to order!
                        </h1>
                    </div>
                }
            </div> 
           
         :
         <div>
            <h1>You have no access! You must Login first! </h1>
            <h1><Link to='/login'>Go</Link> to login page</h1>
         </div>
         }
        </div>
    );
}
