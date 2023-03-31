// store here
import { configureStore } from "@reduxjs/toolkit";

import orderReducer from "./slices/orderSlice";
import productDetailReducer from "./slices/productDetailSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";


const store = configureStore({
    reducer: {products: productReducer, users: userReducer, orders: orderReducer, productDetail: productDetailReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;