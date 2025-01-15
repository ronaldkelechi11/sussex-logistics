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
        <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 py-12 sm:py-16 md:py-20 overflow-hidden">
            {/* Responsive Background Patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-20 h-20 sm:w-40 sm:h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-60 sm:h-60 bg-primary-400 rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
                        Our Achievements
                    </h2>
                    <p className="text-primary-100 text-base sm:text-lg md:text-xl">
                        Delivering excellence through numbers
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 text-center transform transition-all hover:shadow-2xl"
                        >
                            <div className="text-primary-300 text-2xl sm:text-3xl mb-3 sm:mb-4">
                                {stat.icon}
                            </div>
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                                {stat.number}
                            </div>
                            <div className="text-primary-100 text-sm sm:text-base font-medium mb-1 sm:mb-2">
                                {stat.label}
                            </div>
                            <div className="text-primary-200 text-xs sm:text-sm">
                                {stat.description}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
