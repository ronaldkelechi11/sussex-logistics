import { motion } from 'framer-motion';
import { FiTruck, FiAward, FiUsers, FiGlobe, FiCheckCircle, FiTarget, FiTrendingUp, FiShield, FiClock } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans">
            <Navbar />

            <main className="flex-1">
                {/* Hero Banner Section */}
                <section className="relative bg-slate-900 text-white py-20 sm:py-28 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/logistics-hero.jpg"
                            alt="Logistics Operation"
                            className="w-full h-full object-cover opacity-25"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/70" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4"
                        >
                            Global Logistics Pioneer
                        </motion.span>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight"
                        >
                            Connecting Global Commerce With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Unmatched Precision</span>
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-slate-300 text-base sm:text-xl max-w-2xl leading-relaxed"
                        >
                            Since 2003, Sussex Logistics has delivered world-class air, ocean, and overland logistics solutions to businesses and individuals across 150+ countries.
                        </motion.p>
                    </div>
                </section>

                {/* Company Story & Highlights */}
                <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Image & Experience Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-6 relative"
                        >
                            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                                <img
                                    src="/images/about-story.jpg"
                                    alt="Our Global Operations"
                                    className="w-full h-[320px] sm:h-[420px] object-cover"
                                />
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="absolute -bottom-6 -right-2 sm:-right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl border border-blue-400 max-w-[220px]"
                            >
                                <div className="text-4xl font-extrabold tracking-tight">20+</div>
                                <div className="text-xs font-bold uppercase tracking-wider text-blue-100 mt-1">Years of Logistics Supremacy</div>
                            </motion.div>
                        </motion.div>

                        {/* Text Story */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-6 space-y-6"
                        >
                            <div>
                                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Our Heritage</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                                    Empowering Supply Chains Worldwide
                                </h2>
                            </div>

                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                                What started as a regional freight carrier in 2003 has evolved into an agile, tech-enabled international logistics ecosystem. Today, Sussex Logistics coordinates complex freight journeys spanning multimodal air charters, ocean vessel routes, and last-mile express deliveries.
                            </p>

                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                Our commitment remains simple: transparent tracking, zero-delay customs processing, and absolute cargo security from pickup to final handshake.
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                {[
                                    { icon: <FiTruck className="text-blue-600" />, title: "Modern Fleet", desc: "Eco-friendly trucks & aircraft" },
                                    { icon: <FiGlobe className="text-blue-600" />, title: "150+ Countries", desc: "Seamless port connections" },
                                    { icon: <FiShield className="text-blue-600" />, title: "Full Cargo Insurance", desc: "100% peace of mind" },
                                    { icon: <FiClock className="text-blue-600" />, title: "24/7 Desk", desc: "Live dispatch monitoring" }
                                ].map((item, index) => (
                                    <div key={index} className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm">
                                        <div className="text-xl mb-1">{item.icon}</div>
                                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                                        <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="bg-slate-900 text-white py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400">Guiding Principles</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                                Driven By Values That Put You First
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <FiAward className="w-8 h-8 text-blue-400" />,
                                    title: 'Operational Excellence',
                                    description: 'We hold every shipment to stringent safety and speed benchmarks, ensuring flawless execution on every route.'
                                },
                                {
                                    icon: <FiTrendingUp className="w-8 h-8 text-cyan-400" />,
                                    title: 'Technology & Transparency',
                                    description: 'Our real-time tracking systems and instant rate calculators give customers total visibility into their supply chain.'
                                },
                                {
                                    icon: <FiCheckCircle className="w-8 h-8 text-emerald-400" />,
                                    title: 'Uncompromised Reliability',
                                    description: 'With a 99.8% on-time delivery record, businesses rely on Sussex Logistics to meet critical commercial deadlines.'
                                }
                            ].map((value, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -8 }}
                                    className="p-8 bg-slate-800/80 border border-slate-700/80 rounded-3xl shadow-xl backdrop-blur-sm"
                                >
                                    <div className="mb-6">{value.icon}</div>
                                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Banner */}
                <section className="py-16 bg-blue-600 text-white">
                    <div className="max-w-5xl mx-auto px-4 text-center">
                        <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
                            Ready To Upgrade Your Global Shipping Experience?
                        </h2>
                        <p className="text-blue-100 text-sm sm:text-lg mb-8 max-w-2xl mx-auto">
                            Calculate an instant shipping rate or get in touch with our freight experts today.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="/#rate-estimator"
                                className="px-6 py-3.5 bg-white text-blue-700 hover:bg-slate-100 font-bold rounded-xl shadow-lg transition-all text-sm"
                            >
                                Calculate Shipping Rate
                            </a>
                            <a
                                href="/#contact"
                                className="px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white border border-blue-400 font-bold rounded-xl transition-all text-sm"
                            >
                                Contact Freight Team
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
