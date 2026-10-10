import React, { useState } from 'react';
import { FaShip, FaTruck, FaPlane, FaWarehouse, FaCheckCircle, FaArrowRight, FaClock, FaShieldAlt, FaGlobeAmericas } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Services = () => {
    const [activeTab, setActiveTab] = useState(0);

    const services = [
        {
            id: 'ocean',
            icon: FaShip,
            title: 'Ocean Freight & Maritime Cargo',
            shortDesc: 'Cost-effective global ocean freight solutions connecting major international ports.',
            description: 'Our maritime logistics network handles Full Container Load (FCL) and Less than Container Load (LCL) shipments globally. With strategic port partners, optimized scheduling, and complete customs clearance assistance.',
            image: '/images/ocean-freight.jpeg',
            stats: [
                { label: 'Port Network', value: '150+ Ports' },
                { label: 'Avg Transit', value: '15-35 Days' },
                { label: 'Reliability Rate', value: '99.5%' }
            ],
            features: [
                'Full Container Load (FCL) & LCL options',
                'Bulk cargo & specialized freight handling',
                'Port-to-port and door-to-door delivery',
                'Real-time vessel tracking & documentation'
            ]
        },
        {
            id: 'air',
            icon: FaPlane,
            title: 'Express Air Freight Cargo',
            shortDesc: 'Time-critical global air transport with priority customs clearance.',
            description: 'When speed is paramount, our express air cargo service ensures urgent shipments arrive safely within days. Partnered with top commercial airlines and freighter networks worldwide.',
            image: '/images/air-freight.jpg',
            stats: [
                { label: 'Global Cities', value: '200+ Cities' },
                { label: 'Avg Transit', value: '1-3 Days' },
                { label: 'On-Time Delivery', value: '99.9%' }
            ],
            features: [
                'Next-flight-out express delivery',
                'Dedicated cargo charter services',
                'Temperature-sensitive pharma & perishable transport',
                'Comprehensive customs brokerage'
            ]
        },
        {
            id: 'land',
            icon: FaTruck,
            title: 'Land Logistics & Road Freight',
            shortDesc: 'Extensive overland trucking and last-mile delivery networks.',
            description: 'Flexible ground transportation services across nationwide highway networks. Equipped with GPS tracking, scheduled routes, and door-to-door delivery precision.',
            image: '/images/land-transport.jpg',
            stats: [
                { label: 'Territory Coverage', value: 'National' },
                { label: 'Avg Transit', value: '1-5 Days' },
                { label: 'Fleet Safety', value: '99.8%' }
            ],
            features: [
                'Full Truck Load (FTL) & LTL solutions',
                'Express highway expedited trucking',
                'Last-mile residential and commercial delivery',
                'GPS real-time route tracking'
            ]
        },
        {
            id: 'warehousing',
            icon: FaWarehouse,
            title: 'Smart Warehousing & Fulfillment',
            shortDesc: 'Secure storage facilities with integrated order fulfillment systems.',
            description: 'State-of-the-art climate-controlled distribution centers offering inventory tracking, pick-and-pack services, cross-docking, and flexible storage terms.',
            image: '/images/warehousing.jpg',
            stats: [
                { label: 'Hub Locations', value: '50+ Warehouses' },
                { label: 'Total Capacity', value: '1M+ Sq Ft' },
                { label: 'Inventory Accuracy', value: '99.9%' }
            ],
            features: [
                'Automated inventory tracking system',
                'Order pick, pack, and labeling',
                'Cross-docking and transshipment',
                '24/7 climate and security surveillance'
            ]
        }
    ];

    const currentService = services[activeTab];
    const ActiveIcon = currentService.icon;

    return (
        <section className="py-20 bg-white" id="services">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200 mb-3">
                        Comprehensive Logistics
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        World-Class Transportation Services
                    </h2>
                    <p className="text-slate-600 text-base sm:text-lg">
                        Tailored logistics solutions built for speed, transparency, and global reach across air, sea, and land.
                    </p>
                </div>

                {/* Service Navigation Tabs */}
                <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
                    <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            const isActive = activeTab === index;
                            return (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveTab(index)}
                                    className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                                    <span>{service.id.toUpperCase()}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Content Display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="bg-slate-50 border border-slate-200/80 rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12"
                    >
                        {/* Image Showcase */}
                        <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[460px]">
                            <img
                                src={currentService.image}
                                alt={currentService.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent lg:hidden" />
                            <div className="absolute bottom-4 left-4 right-4 lg:hidden text-white">
                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Featured Service</span>
                                <h3 className="text-xl font-bold">{currentService.title}</h3>
                            </div>
                        </div>

                        {/* Details Content */}
                        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                            <div>
                                <div className="hidden lg:flex items-center space-x-3 mb-4">
                                    <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                                        <ActiveIcon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-slate-900">{currentService.title}</h3>
                                </div>

                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                                    {currentService.description}
                                </p>

                                {/* Key Features Checklist */}
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Solutions & Capabilities</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {currentService.features.map((feature, i) => (
                                            <div key={i} className="flex items-center space-x-2 text-slate-700 text-xs sm:text-sm">
                                                <FaCheckCircle className="text-blue-600 w-4 h-4 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div>
                                <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-slate-200/80 mb-6">
                                    {currentService.stats.map((stat, i) => (
                                        <div key={i} className="text-center">
                                            <div className="text-base sm:text-lg font-extrabold text-blue-600">{stat.value}</div>
                                            <div className="text-[11px] font-medium text-slate-500">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <a
                                        href="#rate-estimator"
                                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow transition-all duration-200"
                                    >
                                        <span>Get Instant Rate</span>
                                        <FaArrowRight className="ml-2 text-xs" />
                                    </a>
                                    <a
                                        href="#contact"
                                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-sm font-bold rounded-xl transition-all duration-200"
                                    >
                                        Speak With Freight Expert
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Services;
