import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar_top">
                <div className="navbar_top_1">
                    <div className="address">Lorem, ipsum dolor.</div>
                    <div className="dates">Mon - Fri : 09.00 AM - 09.00 PM</div>
                </div>
                <div className="navbar_top_2">
                    <div className="number">+012 345 6789</div>
                    <div className="email">contact@sussexlogistics.com</div>
                </div>
            </div>
            <div className="navbar_bottom">
                <div className="navbar_bottom_logo"></div>
                <div className="navbar_bottom_links">
                    <Link>Home</Link>
                    <Link>About</Link>
                    <Link>Track</Link>
                    <Link>Services</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
