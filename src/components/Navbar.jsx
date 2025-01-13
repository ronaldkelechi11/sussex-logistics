import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaBars, FaTimes, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const navbarHeight = document.getElementById('mainNav').offsetTop;
            setIsScrolled(window.scrollY > navbarHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ['Home', 'Services', 'About', 'Track', 'Contact'];

    return (
        <>
            {/* Top Bar - Only visible when not scrolled */}
            <div className={`bg-gradient-to-r from-primary-600 to-primary-800 transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'
                }`}>
                <div className="max-w-7xl mx-auto px-4 py-3 hidden md:flex justify-between items-center">
                    <div className="flex space-x-6">
                        <div className="flex items-center text-white/90 hover:text-white transition-colors duration-300">
                            <FaPhone className="w-4 h-4 mr-2" />
                            <span className="text-sm">(123) 456-7890</span>
                        </div>
                        <div className="flex items-center text-white/90 hover:text-white transition-colors duration-300">
                            <FaEnvelope className="w-4 h-4 mr-2" />
                            <span className="text-sm">info@sussexlogistics.com</span>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-white/90 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                            <FaFacebookF className="w-4 h-4" />
                        </a>
                        <a href="#" className="text-white/90 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                            <FaTwitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="text-white/90 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                            <FaLinkedinIn className="w-4 h-4" />
                        </a>
                        <a href="#" className="text-white/90 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                            <FaInstagram className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav id="mainNav" className={`bg-white shadow-md transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 right-0 animate-slideDown' : ''
                }`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between">
                        {/* Logo */}
                        <NavLink reloadDocument className="flex items-center">
                            <img className="w-32 h-32 hover:opacity-90 transition-opacity duration-300" src='/images/logo.JPG' alt="Sussex Logistics" />
                        </NavLink>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    className="relative text-gray-700 font-medium transition-colors duration-300 hover:text-primary-600 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700 hover:text-primary-600 transition-colors duration-300"
                            >
                                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                            {navLinks.map((link) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-all duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
