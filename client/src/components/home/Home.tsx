import { Button } from "@mui/material";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";

import "./Home.css"

export default function Hero() {
  const CheckOutBTN = styled(Button)({
    color: "#fff",
    borderColor: "#fff",
    "&:hover": {
      borderColor: "#f72585",
      backgroundColor:"#f72585"
    },
  }); 
  return (
    <div className="home-hero">
      <h1>The <em>Clothes</em> <br/><em>You'll</em><br/> Ever <em>Need!</em></h1>
        <div className="hero-button">
        <Link to="/products">
          <CheckOutBTN variant="outlined" size="large">
             Check out our collection!
          </CheckOutBTN>
        </Link>
        </div>
    </div>
  );
}