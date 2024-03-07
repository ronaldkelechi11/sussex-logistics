import { useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const SESSION_STORAGE_ADMINISLOGGEDIN = sessionStorage.getItem("sessionstorageadminisloggedin");

    return (
        <div className="navbar">
            <div className="navbar_top">
                <div className="navbar_top_1">
                    <div className="address"></div>
                    <div className="dates">Mon - Fri : 09.00 AM - 06.00 PM</div>
                </div>
                <div className="navbar_top_2">
                    <div className="number">+44 7466 116125</div>
                    <div className="email">billing4sussexlogistics@gmail.com</div>
                </div>
            </div>
            <div className="navbar_bottom">
                <div className="navbar_bottom_logo"></div>
                <div className="navbar_bottom_links">
                    <a href="/#home">Home</a>
                    <a href='/#about'>About</a>
                    <Link to={"/track"}>Track</Link>
                    <a href="/#services">Services</a>
                    <a href="/#contact">Contact</a>
                    <Link to="/admin">{SESSION_STORAGE_ADMINISLOGGEDIN ? "Admin" : "Login"}</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
