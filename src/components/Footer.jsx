import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Decorative line */}
                <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-400 mb-12 mx-auto md:mx-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Company section */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">Sussex Logistics</h3>
                        <p className="text-primary-100">Your trusted partner in global logistics solutions.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {['About Us', 'Services', 'Track Shipment', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-primary-100 hover:text-white hover:translate-x-2 transition-all inline-block"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Info</h4>
                        <div className="space-y-3">
                            {[
                                { icon: <FaPhone className="text-primary-300" />, text: "+1 (224) 230-0187" },
                                { icon: <FaEnvelope className="text-primary-300" />, text: "sussexlogisticsservice@gmail.com" },
                                { icon: <FaMapMarkerAlt className="text-primary-300" />, text: " Salmoor Way, Maryport CA15 8BD, UK" }
                            ].map((item, index) => (
                                <p key={index} className="flex items-center space-x-3 text-primary-100">
                                    {item.icon}
                                    <span>{item.text}</span>
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Newsletter</h4>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 bg-white/10 text-white placeholder-primary-200 border border-primary-700 rounded-lg focus:outline-none focus:border-primary-400 transition-colors"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-500 hover:from-primary-600 hover:to-primary-600 text-white rounded-lg transition-all transform hover:scale-[1.02]"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
