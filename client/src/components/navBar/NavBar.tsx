import {Link} from 'react-router-dom'
import DehazeIcon from '@mui/icons-material/Dehaze';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Box } from "@mui/material";
import ProductsIcon from '@mui/icons-material/CheckroomOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonIcon from '@mui/icons-material/Person2Outlined';
import OrderIcon from '@mui/icons-material/Dvr';

import SearchForm from "../searchForm/SearchForm";
import "./NavBar.css"

export default function NavBar(){

    const isLoggedIn:boolean = JSON.parse(localStorage.getItem("LoginInfo")!)
    
    return <Box className="nav-bar">
        <Box className="left-nav-bar">
        <DehazeIcon sx={{color: "black"}}/>
        <Link to="/">E-Commerce</Link>
        <SearchForm/>
        </Box>
        <Box className="right-nav-bar">
        <Link to="/products"><ProductsIcon sx={{color: "black"}}/></Link>
        <Link to="/favorite"><FavoriteIcon sx={{color: "black"}}/></Link>
        <Link to="/cart"><ShoppingCartIcon sx={{color: "black"}}/></Link>
        {
            isLoggedIn? 
            <Box className="logged-in">
                <Link to="/orders"><OrderIcon sx={{color: "black"}}/></Link>
                <Link to="/profile"><PersonIcon sx={{color: "black"}}/></Link>
            </Box>
            :
            <Link to="/login"><PersonIcon sx={{color: "black"}}/></Link>
        } 
        
        </Box>
    </Box>
}