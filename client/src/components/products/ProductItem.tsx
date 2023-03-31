import {Card, CardContent, CardMedia, CardActions, IconButton, Typography} from '@mui/material'
import { useDispatch, useSelector } from "react-redux/es/exports";
import { AppDispatch, RootState } from "../../redux/store";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";

import { productActions } from "../../redux/slices/productSlice";
import { Products } from "../../types/types";

type Prop ={
  item: Products
}

export default function ProductItem({item}:Prop) {
  
  const updateProduct = {...item, quantity: 1}
  const cartList = useSelector((state: RootState)=> state.products.cartList);
  const favoriteList = useSelector((state: RootState)=> state.products.favorites);
  const dispatch = useDispatch<AppDispatch>();
  const isInCart= cartList.some((product)=> 
    product.id === item.id
  );
  const isFavorite = favoriteList.some((product) => product.id === item.id);

  return (
        <div className="product-item">
          <Card sx={{ maxWidth: 345}}>
            <CardMedia
              component="img"
              height="200"
              width= "100"
              image={item.image}
              alt="This is image of the product"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                    {item.title.slice(0,20)} <br/>
                    <span>${item.price}</span>
              </Typography>
              <Typography>
                <Link to={`/products/${item.id}`}> More Detail</Link>
              </Typography>
            </CardContent>
              <CardActions disableSpacing>
                <CardActions>
                <IconButton aria-label="add to favorites"
                      onClick={()=> {
                         isFavorite? dispatch(productActions.removeFromFavorite(item.id))
                         :dispatch(productActions.addToFavorite(item))
                        }}
                      >
                      <FavoriteIcon sx={{ color: isFavorite? "red":"gray"}}/>
                </IconButton>
                </CardActions> 
                <CardActions>
                <IconButton aria-label="add to cart"
                      onClick={()=> {
                         isInCart? dispatch(productActions.removeFromCart(item.id))
                         :dispatch(productActions.addToCart(updateProduct))
                        }}
                      >
                      <ShoppingCartIcon sx={{ color: isInCart? "red":"gray"}}/>
                </IconButton>
                </CardActions>
              </CardActions>
          </Card>
        </div>
  );
}
