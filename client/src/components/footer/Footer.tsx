import {Link} from "react-router-dom"
import "./Footer.css"

export default function Footer(){
    return <div className="footer">
        <div className="footer-links">
            <Link to=''>Privacy statement</Link>
        </div>
        <div className="footer-links">
            <Link to=''>Copy right</Link>
        </div>
        <div className="footer-links">
            <Link to=''>Cookies</Link>
        </div> 
    </div>
}