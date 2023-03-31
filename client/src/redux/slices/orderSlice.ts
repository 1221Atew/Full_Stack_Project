import { createSlice } from "@reduxjs/toolkit";

import { Orders} from "../../types/types";

type InitialState ={
    order: Orders[]
}
const initialState: InitialState = {
    order: []
}
const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        getOrderData: (state, action) =>{
            state.order = action.payload;
        },
    }
})
export const orderActions = orderSlice.actions;
const orderReducer = orderSlice.reducer;
export default orderReducer;