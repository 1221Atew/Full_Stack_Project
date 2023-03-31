import {useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {RootState } from "../../redux/store";
import FavoriteItem from "./FavoriteItem";
import "./FavoriteList.css"

export default function FavoriteList(){
    const favoriteList = useSelector((state: RootState)=> state.products.favorites)

return (
        <div className="favorite">
            <div className="sub-favorite">
            <div className="favorite-header"><h1>My Favorites({favoriteList.length})</h1></div>
            {
            favoriteList.length>0 ?
                favoriteList.map((item)=>{
                    return (
                        <div className="my-favorites"> 
                            <FavoriteItem item={item} key={item.id}/>  
                        </div>    
                    );
                }
                )
                :
                <div className="no-favorite">
                    <h1>
                       <Link to="/products">Go</Link> to product page to select your favorites!
                    </h1>
                </div>
            }
            </div>   
        </div>
    );
}