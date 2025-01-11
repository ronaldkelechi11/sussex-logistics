import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Sussex Logistics</h3>
                        <p className="text-sm">Your trusted partner in global logistics solutions.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {['About Us', 'Services', 'Track Shipment', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Info</h4>
                        <div className="space-y-3">
                            <p className="flex items-center">
                                <FaPhone className="mr-2" />
                                (123) 456-7890
                            </p>
                            <p className="flex items-center">
                                <FaEnvelope className="mr-2" />
                                info@sussexlogistics.com
                            </p>
                            <p className="flex items-center">
                                <FaMapMarkerAlt className="mr-2" />
                                123 Logistics Ave, Sussex, UK
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Newsletter</h4>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
