import { useEffect} from "react";
import {useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux/es/exports";
import {IconButton} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { AppDispatch, RootState } from "../../redux/store";
import fetchProductDetailData from "../../redux/thunks/productDetailThunk";
import "./ProductDetail.css" 
import { productActions } from "../../redux/slices/productSlice";

type Params ={
  id: string,
}

export default function ProductList() {

  const productDetail = useSelector((state: RootState)=> state.productDetail.productDetail);
  const cartList = useSelector((state: RootState)=> state.products.cartList);
  const favoriteList = useSelector((state: RootState)=> state.products.favorites);
  const isInCart= cartList.some((product)=> product.id === productDetail.id);
  const isFavorite = favoriteList.some((product) => product.id === productDetail.id);
  
  const {id}= useParams<Params>()

  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(fetchProductDetailData(id));
  },[dispatch, id])

  return <div className="product-detail">
          <div className="sub-product-detail">
            <div className="product-detail-image"><img src={productDetail.image} alt="" /></div>
            <div className="product-detail-para">
              <p><strong>Name:-</strong>{productDetail.title}</p>
              <p><strong>Category:-</strong>{productDetail.category}</p>
              <p><strong>Short description:-</strong>{productDetail.description}</p>
              <IconButton aria-label="add to favorite"
                      onClick={()=> {
                         isInCart? dispatch(productActions.removeFromFavorite(productDetail.id))
                         :dispatch(productActions.addToFavorite(productDetail))
                        }}
                      >
                      <FavoriteIcon sx={{ color: isFavorite? "red":"gray"}}/>
              </IconButton>
              <IconButton aria-label="add to cart"
                      onClick={()=> {
                         isInCart? dispatch(productActions.removeFromCart(productDetail.id))
                         :dispatch(productActions.addToCart(productDetail))
                        }}
                      >
                      <ShoppingCartIcon sx={{ color: isInCart? "red":"gray"}}/>
                </IconButton>
            </div> 
          </div>     
  </div>;
}
