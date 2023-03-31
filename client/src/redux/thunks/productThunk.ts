// product thunk here
import axios from "axios"

import { productActions } from "../slices/productSlice";
import { AppDispatch } from "../store";

export default function fetchProductsData(){
    const url = `http://localhost:8004/products`;
    return (dispatch: AppDispatch) => {
        axios.get(url)
        .then((res)=> res.data)
        .then((data)=> dispatch(productActions.getProductsData(data)));
    }
}