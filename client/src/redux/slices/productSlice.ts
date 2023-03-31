//  product slice here
import { createSlice } from "@reduxjs/toolkit";

import { Products } from "../../types/types";

type InitialState = {
    products: Products[],
    searchedProducts: Products[],
    favorites: Products[]
    cartList: Products[]
}
const initialState: InitialState = {
    products: [],
    searchedProducts: [],
    favorites: [],
    cartList: []
}
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProductsData: (state, action) =>{
            state.products = action.payload;
        },
        getSearchData: (state, action) =>{
            state.searchedProducts = action.payload;
        },
        addToFavorite: (state, action)=>{
            state.favorites.push(action.payload)
        },
        removeFromFavorite: (state, action)=>{
          //let currentLocalStorage: Products[] = JSON.parse(localStorage.getItem("favorites") || "null");
          //state.favorites = [...currentLocalStorage];
          const result = state.favorites.findIndex((product)=>
          product.id === action.payload
        )
        if (result !== -1){
          state.favorites.splice(result, 1)
          //localStorage.setItem("favorites", JSON.stringify(state.favorites))
        }

        },
        addToCart: (state, action) => {
            state.cartList.push(action.payload);
          },
        removeFromCart: (state, action) => {
            const result = state.cartList.findIndex((product)=>
              product.id === action.payload
            )
            if (result !== -1){
              state.cartList.splice(result, 1)
            }
          },
        increaseQuantity: (state, action) => {
            const result = state.cartList.findIndex((product)=>
              product.id === action.payload
            )
            state.cartList[result].price += state.cartList[result].price / state.cartList[result].quantity;
            state.cartList[result].quantity += 1;
          },
          decreaseQuantity: (state, action) => {
            const result = state.cartList.findIndex((product)=>
              product.id === action.payload
            )
            if (state.cartList[result].quantity > 1){
              state.cartList[result].price -= state.cartList[result].price / state.cartList[result].quantity;
              state.cartList[result].quantity -= 1;
            }
          }
    }
})
export const productActions = productsSlice.actions;
const productReducer = productsSlice.reducer;
export default productReducer;