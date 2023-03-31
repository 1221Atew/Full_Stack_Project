import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { AppDispatch, RootState } from "../../redux/store";
import fetchProductsData from "../../redux/thunks/productThunk";
import ProductItem from "./ProductItem";
import "./ProductList.css"

export default function ProductList() {

  const productList = useSelector((state: RootState)=> state.products.products);
  const searchedProducts = useSelector((state:RootState)=> state.products.searchedProducts);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(fetchProductsData());
  },[dispatch])

  return <div className="products">
    {
      (searchedProducts.length > 0) ?
      searchedProducts.map((item)=>{
        return <ProductItem key={item.id} item={item}/>
      })
    :
      productList.map((item)=>{
        return <ProductItem key={item.id} item={item}/>
      })
    }
  </div>;
}
