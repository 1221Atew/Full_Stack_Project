//  product slice here
import { createSlice } from "@reduxjs/toolkit";

import { Products } from "../../types/types";

type InitialState = {
    productDetail: Products,
}

const initialState: InitialState = {
    productDetail: {
        id: 0,
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
        rating :0,
        countInStock: 0,
        quantity: 0
    },
}
const productDetailSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProductData: (state, action) =>{
            state.productDetail = action.payload;
        }   
    }
})
export const productDetailActions = productDetailSlice.actions;
const productDetailReducer = productDetailSlice.reducer;
export default productDetailReducer;