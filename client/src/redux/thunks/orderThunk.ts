import axios from "axios"

import { AppDispatch } from "../store";
import { orderActions } from '../slices/orderSlice';

export default function fetchOrderData(){
    const users = JSON.parse(localStorage.getItem("user")!);
    const userId= users.userData._id
    const accessToken= users.token
    const url = `http://localhost:8004/orders/${userId}`;
    return (dispatch: AppDispatch) => {
        axios.get(url, {headers: {Authorization: `Bearer ${accessToken}`}})
        .then((res)=> res.data)
        .then((data)=> dispatch(orderActions.getOrderData(data)));
    }
}