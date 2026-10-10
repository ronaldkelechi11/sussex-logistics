import { useState } from 'react';
import { FaSearch, FaTruckMoving, FaShieldAlt, FaGlobeAmericas, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const navigate = useNavigate();

    const handleTracking = (e) => {
        e.preventDefault();
        if (trackingNumber.trim()) {
            navigate(`/package/${trackingNumber.trim()}`);
        }
    };

    return (
        <section className="relative min-h-[calc(100vh-4rem)] lg:min-h-[90vh] bg-slate-900 text-white flex items-center overflow-hidden" id="home">
            {/* Background Image with Dark Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/logistics-hero.jpg"
                    alt="Global Logistics Operations"
                    className="w-full h-full object-cover object-center opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Heading, Subheading & Quick Track Card */}
                    <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4">
                                <FaGlobeAmericas className="mr-2" /> Global Express Freight & Cargo
                            </span>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                                Delivering Excellence Across Continents With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Speed & Precision</span>
                            </h1>
                            <p className="text-slate-300 text-base sm:text-xl max-w-2xl mt-4 leading-relaxed">
                                Experience seamless international supply chain logistics, real-time shipment tracking, and ocean, air, and land freight solutions tailored to your business.
                            </p>
                        </motion.div>

                        {/* Interactive Tracking Input Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 shadow-2xl max-w-xl"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-base sm:text-lg font-bold text-white flex items-center">
                                    <FaSearch className="mr-2 text-blue-400 text-sm" /> Track Your Shipment
                                </h2>
                                <span className="text-xs text-slate-300">Real-time status updates</span>
                            </div>

                            <form onSubmit={handleTracking} className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Enter Tracking ID (e.g., SL-100293)"
                                        className="w-full px-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 text-sm whitespace-nowrap"
                                >
                                    <span>Track Shipment</span>
                                </button>
                            </form>
                            <p className="text-[11px] text-slate-400 mt-2.5 flex items-center space-x-2">
                                <span>Example tracking ID available on dispatch documents</span>
                            </p>
                        </motion.div>

                        {/* Badges Bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="pt-2 flex flex-wrap items-center gap-6 text-slate-300 text-xs sm:text-sm font-semibold"
                        >
                            <div className="flex items-center space-x-2">
                                <FaShieldAlt className="text-blue-400 w-4 h-4" />
                                <span>100% Secure Transport</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaClock className="text-blue-400 w-4 h-4" />
                                <span>24/7 Live Monitoring</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCheckCircle className="text-blue-400 w-4 h-4" />
                                <span>Customs Approved</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Key Value Prop Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-5 hidden lg:block space-y-4"
                    >
                        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:border-blue-500/50 transition-all duration-300">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                                    <FaGlobeAmericas className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">150+ Countries Connected</h3>
                                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                                        Seamless maritime, air charter, and road freight routes handling global cargo with customs efficiency.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:border-blue-500/50 transition-all duration-300">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                                    <FaClock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">99.8% On-Time Delivery</h3>
                                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                                        End-to-end dispatch tracking and automated updates keep your operations ahead of schedule.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Animated Freight Truck Motif */}
                        <div className="bg-gradient-to-r from-blue-900/40 to-slate-800/40 border border-slate-700/60 rounded-2xl p-4 overflow-hidden relative">
                            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                                <span className="font-semibold text-blue-400">Sussex Express Fleet Active</span>
                                <span>Live Dispatch Route</span>
                            </div>
                            <div className="relative h-10 flex items-center">
                                <div className="w-full border-b-2 border-dashed border-slate-600" />
                                <div className="absolute right-0 animate-drive">
                                    <FaTruckMoving className="text-blue-400 w-8 h-8" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
