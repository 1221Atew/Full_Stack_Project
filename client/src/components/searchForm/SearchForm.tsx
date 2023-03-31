import React, {useState} from "react";
import { TextField } from "@mui/material";
import {useDispatch, useSelector} from 'react-redux'

import { productActions } from "../../redux/slices/productSlice";
import { RootState } from "../../redux/store";
import "./SearchForm.css"

export default function SearchForm(){
    
    const [userInput, setUserInput] =  useState("")
    const dispatch= useDispatch();
    const productList = useSelector((state: RootState)=> state.products.products)
    const searchedProductsList = productList.filter((item)=>
        item.title.toLocaleLowerCase().includes(userInput.toLocaleLowerCase())
    )
    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
        setUserInput(event.target.value)
        dispatch(productActions.getSearchData(searchedProductsList));
    }
    return (
        <div className="search-form">
            <TextField id="standard-basic" label="Search" variant="standard" onChange={onChangeHandler} sx={{color: "white"}}/>
        </div>
    );
}