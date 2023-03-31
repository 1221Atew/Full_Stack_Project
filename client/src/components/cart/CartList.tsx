import React, {useState} from "react"
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Snackbar, Alert} from "@mui/material";
import axios from "axios";

import { RootState } from "../../redux/store";
import CartItem from "./CartItem";
import "./CartList.css"

export default function CartList(){
    const navigate = useNavigate();
    const cartList = useSelector((state: RootState)=>state.products.cartList)
    const isLoggedIn:boolean = JSON.parse(localStorage.getItem("LoginInfo")!)
    
    const total = cartList.reduce<number>((sum: number, value: { price: number; }) => {
            return sum + value.price
    }, 0);

    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
        ) => {
        if (reason === "clickaway") {
        return;
    }
        setOpen(false);
    };

    function onClickHandler(){
        if (isLoggedIn){
            const users = JSON.parse(localStorage.getItem("user")!);
            const userId= users.userData._id; 
            const accessToken = users.token;
            const url = `http://localhost:8004/orders/${userId}`
            const values = {userId: userId, productOrder: cartList}
            axios.post(url, values, {headers: {Authorization: `Bearer ${accessToken}`}});
        }
        else{
            navigate("/login")
        }
    }
    return (
        <div className="cart">
            <div className="sub-cart">
            <div className="cart-header"><h1>My Shopping Cart({cartList.length})</h1></div>
            {cartList.length > 0 ?
            <div className="my-carts">
                {cartList.map((item)=>{
                    return <div className="carts">
                        <CartItem item={item} key={item.title}/>  
                    </div>
                })}
                <div className="cart-order">
                    <div className="total"><h4>Total: $ {total.toFixed(2)}</h4></div>
                    <div className="order-button">
                        <Button variant="contained" onClick={() => { 
                            onClickHandler();
                            handleClick();
                            } }>Order
                        </Button>
                    </div>
                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                            Your order has sent successfuly. Thank you for your Order!
                        </Alert>
                    </Snackbar>
                </div>
            </div>    
                :
            <div className="no-cart">
                <h1>
                    <Link to="/products">Go</Link> to product page for shopping!
                </h1>
            </div>
            }
            </div>
        </div>
    );
}