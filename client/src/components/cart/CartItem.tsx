import { Box } from "@mui/system";
import AddRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import RemoveShoppingCart from '@mui/icons-material/RemoveShoppingCartRounded';
import { IconButton, Typography} from "@mui/material";
import { useDispatch } from "react-redux";

import { Products } from "../../types/types";
import { productActions } from "../../redux/slices/productSlice";
import "./CartItem.css"

type Prop ={
    item: Products
}

export default function CartItem({item}: Prop){
    const dispatch = useDispatch()
    
    return (
            <Box className="cart-detail" sx={{ boxShadow: 5}}>
                    <Box className="cart-image">
                        <img src={item.image} alt="product" />
                    </Box>
                    <Box className="icons">
                        <Typography>{item.title.slice(0, 20)} - <strong>$ {item.price.toFixed(2)}</strong></Typography>
                        <IconButton
                            aria-label="increaseQuantity"
                            onClick={() => {
                                dispatch(productActions.increaseQuantity(item.id));
                            } }
                        >
                            <AddRoundedIcon sx={{ color: "green" }} />
                        </IconButton>
                        {item.quantity}
                        <IconButton
                            aria-label="decreaseQuantity"
                            onClick={() => {
                                dispatch(productActions.decreaseQuantity(item.id));
                            } }
                        >
                            <RemoveIcon sx={{ color: "red" }} />
                        </IconButton>
                        <IconButton
                            aria-label="removeCart"
                            onClick={() => {
                                dispatch(productActions.removeFromCart(item.id));
                            } }
                        >
                            <RemoveShoppingCart sx={{ color: "red" }} />
                        </IconButton>
                </Box>
        </Box>
    );       
}

