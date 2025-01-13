import React from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaGlobe, FaStar, FaHandshake, FaChartLine, FaUsers } from 'react-icons/fa';

const Achievements = () => {
    const stats = [
        {
            number: '20K+',
            label: 'Deliveries Completed',
            icon: <FaTruck />,
            description: 'Successfully completed deliveries across various routes'
        },
        {
            number: '50+',
            label: 'Countries Served',
            icon: <FaGlobe />,
            description: 'Global presence across continents'
        },
        {
            number: '99%',
            label: 'Customer Satisfaction',
            icon: <FaStar />,
            description: 'Consistently rated excellent by our clients'
        },
        {
            number: '500+',
            label: 'Business Partners',
            icon: <FaHandshake />,
            description: 'Trusted by leading companies worldwide'
        },
        {
            number: '45%',
            label: 'Year-over-Year Growth',
            icon: <FaChartLine />,
            description: 'Continuous business expansion'
        },
        {
            number: '100K+',
            label: 'Happy Customers',
            icon: <FaUsers />,
            description: 'Serving businesses of all sizes'
        }
    ];

    return (
        <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 py-20 overflow-hidden">
            {/* Background Patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary-400 rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Our Achievements</h2>
                    <p className="text-primary-100 text-lg">Delivering excellence through numbers</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center transform transition-all hover:shadow-2xl"
                        >
                            <div className="text-primary-300 text-3xl mb-4">{stat.icon}</div>
                            <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                            <div className="text-primary-100 font-medium mb-2">{stat.label}</div>
                            <div className="text-primary-200 text-sm">{stat.description}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
