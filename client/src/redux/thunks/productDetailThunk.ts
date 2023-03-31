import axios from "axios"

import { AppDispatch } from "../store";
import { productDetailActions } from "../slices/productDetailSlice";

export default function fetchProductDetailData(id: string| undefined){
    const productId = Number(id)
    const url = `http://localhost:8004/products/${productId}`;
    return (dispatch: AppDispatch) => {
        axios.get(url)
        .then((res)=> res.data)
        .then((data)=> dispatch(productDetailActions.getProductData(data)));
    }
}