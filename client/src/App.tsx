import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import Footer from "./components/footer/Footer";
import NavBar from "./components/navBar/NavBar";
import Cart from "./pages/cart/Cart";
import Favorite from "./pages/favorites/Favorites";
import Home from "./pages/home/Home";
import Order from "./pages/Order/Order";
import ProductDetails from "./pages/productDetail/ProductDetail";
import Products from "./pages/products/Products";
import Profile from "./pages/profile/Profile";
import LogIn from "./pages/userForm/LogIn";
import SignUp from "./pages/userForm/SignUp";
import UpperFooter from "./components/upperFooter/UpperFooter";
import { userActions } from "./redux/slices/userSlice";
import "./App.css";

function App() {

  const hours = 1;             
  const now = new Date().getTime().toString();
  const setupTime = localStorage.getItem('setupTime'); 
  const dispatch= useDispatch();

  if(Number(now)- Number(setupTime) > hours*60*60*1000) {
      localStorage.removeItem('setupTime');
      localStorage.removeItem('user');
      dispatch(userActions.getLogInfo(false))
    }

  return <div className="App">
    <NavBar/>
    <Routes>
      <Route path="" element={<Home/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/favorite" element={<Favorite/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/orders" element={<Order/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/register" element={<SignUp/>}/>
      <Route path="/products/:id" element={<ProductDetails/>}/>
    </Routes>
    <UpperFooter/>
    <Footer/>
  </div>;
}

export default App;
