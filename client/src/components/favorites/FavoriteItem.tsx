import {Button, IconButton} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

import { Products } from "../../types/types";
import { productActions } from "../../redux/slices/productSlice";
import { AppDispatch, RootState } from "../../redux/store";
import "./FavoriteItem.css"

type Prop ={
    item: Products
}

export default function FavoriteItem({item}: Prop){
    const cartList = useSelector((state: RootState)=> state.products.cartList);
    const dispatch = useDispatch<AppDispatch>()
    const isInCart= cartList.some((product)=> 
        product.id === item.id
    );
    return (
        <div className="favorite-detail">
            <div className="favorite-image">
                <img src={item.image} alt="" />
            </div>
            <div className="my-favorites">
                <p>{item.title.slice(0,20)}</p>
                <p><strong>$</strong>{item.price}</p>
                <Button onClick={()=> {dispatch(productActions.removeFromFavorite(item.id))}}>Remove</Button>
                <IconButton aria-label="add to cart"
                      onClick={()=> {
                         isInCart? dispatch(productActions.removeFromCart(item.id))
                         :dispatch(productActions.addToCart(item))
                        }}
                      >
                      <ShoppingCartIcon sx={{ color: isInCart? "red":"gray"}}/>
                </IconButton>
            </div>  
        </div>
    );
}

