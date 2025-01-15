import { motion } from 'framer-motion';
import { FiTruck, FiAward, FiUsers, FiGlobe, FiCheck, FiTarget, FiTrendingUp } from 'react-icons/fi';
import Footer from '../components/Footer';

const AboutPage = () => {
    return (
        <>
            <div className="min-h-screen">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative bg-primary-600 text-white py-16 sm:py-20 lg:py-32"
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src="/images/logistics-hero.jpg"
                            alt="Logistics Background"
                            className="w-full h-full object-cover opacity-20"
                        />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
                        >
                            About Sussex Logistics
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-base sm:text-lg lg:text-xl max-w-2xl"
                        >
                            Driving the future of logistics with innovation and excellence since 2003
                        </motion.p>
                    </div>
                </motion.div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                    {/* Story Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20"
                    >
                        <div className="relative order-2 lg:order-1">
                            <img
                                src="/images/about-story.jpg"
                                alt="Our Story"
                                className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover"
                            />
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow-xl"
                            >
                                <div className="text-primary-600 text-4xl font-bold">20+</div>
                                <div className="text-gray-600">Years of Excellence</div>
                            </motion.div>
                        </div>
                        <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Our Story</h2>
                            <p className="text-base sm:text-lg text-gray-600">
                                Founded in 2003, Sussex Logistics has grown from a local transport company
                                to a global logistics provider, serving clients across multiple industries
                                and continents.
                            </p>
                            <p className="text-base sm:text-lg text-gray-600">
                                We've built our reputation on reliability, innovation, and exceptional
                                customer service, making us a trusted partner for businesses worldwide.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {[
                                    { icon: <FiTruck />, label: "Modern Fleet" },
                                    { icon: <FiGlobe />, label: "Global Network" },
                                    { icon: <FiUsers />, label: "Expert Team" },
                                    { icon: <FiTarget />, label: "Custom Solutions" }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div className="text-primary-600 text-2xl">{item.icon}</div>
                                        <span className="font-medium">{item.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Values Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 sm:mb-16 lg:mb-20"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Our Core Values</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {[
                                {
                                    icon: <FiAward />,
                                    title: 'Excellence',
                                    description: 'We strive for excellence in every service we provide.'
                                },
                                {
                                    icon: <FiTrendingUp />,
                                    title: 'Innovation',
                                    description: 'Continuously improving our solutions with modern technology.'
                                },
                                {
                                    icon: <FiCheck />,
                                    title: 'Reliability',
                                    description: 'Delivering consistent and dependable service every time.'
                                }
                            ].map((value, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -10 }}
                                    className="p-6 sm:p-8 bg-white rounded-xl shadow-lg border border-gray-100"
                                >
                                    <div className="text-primary-600 text-3xl mb-4">{value.icon}</div>
                                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
