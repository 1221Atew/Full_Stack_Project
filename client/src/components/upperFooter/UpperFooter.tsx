import {Link} from "react-router-dom"

import "./UpperFooter.css"

export default function UpperFooter(){
    return (
    <div className="side-bar">
        <div className="categories">
            <div className="headers"><strong>Popular Categories</strong></div>
            <div className="links"><Link to="">Jackets</Link></div>
            <div className="links"><Link to="">Women clothes</Link></div>
            <div className="links"><Link to="">Men clothes</Link></div>
            <div className="links"><Link to="">Cotton cloths</Link></div>
        </div>
        <div className="more-info">
            <div className="headers"><strong>More information</strong></div>
            <div className="links"><Link to="">Social media</Link></div>
            <div className="links"><Link to="">Tickets</Link></div>
            <div className="links"><Link to="">News</Link></div>
            <div className="links"><Link to="">Cards</Link></div> 
        </div>
        <div className="about">
            <div className="headers"> <strong>About</strong> </div>
            <div className="links"><Link to="">Customer service</Link></div>
            <div className="links"><Link to="">Working for our company</Link></div>
            <div className="links"><Link to="">Commertial</Link></div>
            <div className="links"><Link to="">History</Link></div>
        </div>
        <div className="international">
            <div className="headers"><strong>International</strong></div>
            <div className="links"><Link to="">Belgium</Link></div>
            <div className="links"><Link to="">France</Link></div>
            <div className="links"><Link to="">Germany</Link></div>
            <div className="links"><Link to="">Mexico</Link></div>
        </div>
    </div>
    ) 
}