import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTruck, FiGlobe, FiUsers, FiAward } from 'react-icons/fi';

const statsData = [
    { icon: <FiTruck />, value: "1000+", label: "Deliveries" },
    { icon: <FiGlobe />, value: "50+", label: "Countries" },
    { icon: <FiUsers />, value: "2000+", label: "Clients" },
    { icon: <FiAward />, value: "20+", label: "Years" }
];

const About = () => {
    return (
        <section className="py-8 md:py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mb-8 lg:mb-16"
                >
                    <div className="order-2 lg:order-1 space-y-4 md:space-y-6">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                            Your Trusted Logistics Partner
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                            Sussex Logistics delivers excellence in global supply chain solutions with over two decades of industry expertise.
                        </p>
                        <div className="space-y-3 sm:space-y-4">
                            {[
                                "Custom logistics solutions tailored to your needs",
                                "State-of-the-art tracking and monitoring systems",
                                "Dedicated customer support available 24/7",
                                "Environmentally conscious operations"
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="flex items-center space-x-2"
                                >
                                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-600">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                        <Link
                            to="/about"
                            className="block sm:inline-block text-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors w-full sm:w-auto"
                        >
                            Learn More About Us
                        </Link>
                    </div>
                    <motion.div
                        className="relative order-1 lg:order-2 mb-8 lg:mb-0"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <img
                            src="/images/about_us.jpg"
                            alt="Logistics Operations"
                            className="rounded-lg shadow-lg w-full h-[300px] md:h-[400px] object-cover"
                        />
                        <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-primary-600 text-white p-3 md:p-4 rounded-lg shadow-xl">
                            <p className="font-bold">20+ Years</p>
                            <p className="text-sm">of Excellence</p>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-12"
                >
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="text-center p-4 md:p-6 bg-white rounded-lg shadow-md"
                        >
                            <div className="text-primary-600 text-3xl mb-2 flex justify-center">
                                {stat.icon}
                            </div>
                            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                            <div className="text-gray-600">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default About;
