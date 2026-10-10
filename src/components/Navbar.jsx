import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaBars, FaTimes, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaChevronRight, FaBox } from 'react-icons/fa';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const mainNav = document.getElementById('mainNav');
            if (mainNav) {
                setIsScrolled(window.scrollY > 20);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when mobile drawer is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const navItems = [
        { name: 'Home', href: '/#home', isExternal: false },
        { name: 'Services', href: '/#services', isExternal: false },
        { name: 'Rate Estimator', href: '/#rate-estimator', isExternal: false },
        { name: 'About Us', href: '/about', isPage: true },
        { name: 'FAQ', href: '/#faq', isExternal: false },
        { name: 'Contact', href: '/#contact', isExternal: false },
    ];

    return (
        <>
            {/* Top Bar - Only visible when not scrolled */}
            <div className={`bg-slate-900 text-slate-200 border-b border-slate-800 transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 hidden md:flex justify-between items-center text-xs sm:text-sm">
                    <div className="flex items-center space-x-6">
                        <a href="tel:+12242300187" className="flex items-center hover:text-blue-400 transition-colors duration-200">
                            <FaPhone className="w-3.5 h-3.5 mr-2 text-blue-500" />
                            <span>+1 (224) 230-0187</span>
                        </a>
                        <a href="mailto:sussexlogisticsservice@gmail.com" className="flex items-center hover:text-blue-400 transition-colors duration-200">
                            <FaEnvelope className="w-3.5 h-3.5 mr-2 text-blue-500" />
                            <span>sussexlogisticsservice@gmail.com</span>
                        </a>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-3 text-slate-400">
                            <a href="#" className="hover:text-white transition-colors duration-200 p-1">
                                <FaFacebookF className="w-3.5 h-3.5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors duration-200 p-1">
                                <FaTwitter className="w-3.5 h-3.5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors duration-200 p-1">
                                <FaLinkedinIn className="w-3.5 h-3.5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors duration-200 p-1">
                                <FaInstagram className="w-3.5 h-3.5" />
                            </a>
                        </div>
                        <Link
                            to="/admin-login"
                            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1 rounded-full border border-slate-700 transition-all duration-200"
                        >
                            Staff Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header
                id="mainNav"
                className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 ${
                    isScrolled ? 'shadow-md py-2' : 'shadow-sm py-3'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3 group">
                            <img
                                src="/images/logo.JPG"
                                alt="Sussex Logistics"
                                className="h-12 w-auto object-contain rounded group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="hidden sm:block border-l border-gray-200 pl-3 py-1">
                                <span className="block font-bold text-slate-900 tracking-tight text-lg leading-none">SUSSEX</span>
                                <span className="block text-[10px] font-semibold tracking-widest text-blue-600 uppercase">Logistics & Express</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                            {navItems.map((item) => {
                                const isPageLink = item.isPage;
                                return isPageLink ? (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                            location.pathname === item.href
                                                ? 'text-blue-600 bg-blue-50'
                                                : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-all duration-200"
                                    >
                                        {item.name}
                                    </a>
                                );
                            })}
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <a
                                href="#rate-estimator"
                                className="inline-flex items-center px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                <FaBox className="mr-2 text-xs" />
                                Get Quick Quote
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden items-center space-x-3">
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                aria-label="Open Navigation Menu"
                                className="p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            >
                                <FaBars className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Animated Left Slide-in Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
                        />

                        {/* Slide-In Sidebar Drawer (Left) */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white z-50 lg:hidden shadow-2xl flex flex-col justify-between overflow-y-auto"
                        >
                            {/* Drawer Header */}
                            <div>
                                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <div className="flex items-center space-x-3">
                                        <img src="/images/logo.JPG" alt="Sussex Logistics" className="h-10 w-auto object-contain rounded" />
                                        <div>
                                            <span className="block font-bold text-slate-900 text-base leading-tight">SUSSEX</span>
                                            <span className="block text-[9px] font-bold tracking-wider text-blue-600 uppercase">Logistics</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        aria-label="Close Navigation Menu"
                                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all duration-200"
                                    >
                                        <FaTimes className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Drawer Nav Links */}
                                <div className="px-4 py-6 space-y-1.5">
                                    {navItems.map((item, index) => {
                                        const isPageLink = item.isPage;
                                        return (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.05 * index + 0.1, duration: 0.25, ease: 'easeOut' }}
                                            >
                                                {isPageLink ? (
                                                    <Link
                                                        to={item.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-800 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                                                    >
                                                        <span>{item.name}</span>
                                                        <FaChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                                                    </Link>
                                                ) : (
                                                    <a
                                                        href={item.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-800 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                                                    >
                                                        <span>{item.name}</span>
                                                        <FaChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                                                    </a>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Drawer Footer & Contact Details */}
                            <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-4">
                                <a
                                    href="#rate-estimator"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-colors duration-200"
                                >
                                    <FaBox className="text-sm" />
                                    <span>Get Shipping Rate</span>
                                </a>

                                <div className="space-y-2 text-xs text-slate-600 pt-2">
                                    <a href="tel:+12242300187" className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                                        <FaPhone className="text-blue-500 w-3.5 h-3.5" />
                                        <span>+1 (224) 230-0187</span>
                                    </a>
                                    <a href="mailto:sussexlogisticsservice@gmail.com" className="flex items-center space-x-2 hover:text-blue-600 transition-colors truncate">
                                        <FaEnvelope className="text-blue-500 w-3.5 h-3.5 flex-shrink-0" />
                                        <span className="truncate">sussexlogisticsservice@gmail.com</span>
                                    </a>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-slate-400">
                                    <div className="flex items-center space-x-3">
                                        <a href="#" className="hover:text-blue-600 transition-colors p-1"><FaFacebookF className="w-3.5 h-3.5" /></a>
                                        <a href="#" className="hover:text-blue-600 transition-colors p-1"><FaTwitter className="w-3.5 h-3.5" /></a>
                                        <a href="#" className="hover:text-blue-600 transition-colors p-1"><FaLinkedinIn className="w-3.5 h-3.5" /></a>
                                        <a href="#" className="hover:text-blue-600 transition-colors p-1"><FaInstagram className="w-3.5 h-3.5" /></a>
                                    </div>
                                    <Link
                                        to="/admin-login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                                    >
                                        Staff Portal
                                    </Link>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
