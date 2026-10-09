import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaPlane, FaShip, FaTruck, FaWarehouse, FaClock, FaDollarSign, FaShieldAlt, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const RateEstimator = () => {
    const [origin, setOrigin] = useState('USA');
    const [destination, setDestination] = useState('UK');
    const [weight, setWeight] = useState(10);
    const [serviceType, setServiceType] = useState('air');
    const [isCalculating, setIsCalculating] = useState(false);
    const [quoteResult, setQuoteResult] = useState(null);

    const serviceRates = {
        air: { name: 'Express Air Freight', ratePerKg: 12.5, baseFee: 45, estDays: '2 - 4 Business Days', icon: FaPlane, color: 'text-blue-600 bg-blue-50' },
        ocean: { name: 'Standard Ocean Cargo', ratePerKg: 3.2, baseFee: 85, estDays: '15 - 30 Business Days', icon: FaShip, color: 'text-cyan-600 bg-cyan-50' },
        land: { name: 'Regional Land Transport', ratePerKg: 4.8, baseFee: 30, estDays: '3 - 7 Business Days', icon: FaTruck, color: 'text-amber-600 bg-amber-50' },
        warehouse: { name: 'Fulfilment & Warehousing', ratePerKg: 2.1, baseFee: 50, estDays: '1 - 3 Storage/Fulfillment Days', icon: FaWarehouse, color: 'text-purple-600 bg-purple-50' }
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        setIsCalculating(true);

        setTimeout(() => {
            const selectedService = serviceRates[serviceType];
            const weightVal = parseFloat(weight) || 1;
            const estimatedCost = (weightVal * selectedService.ratePerKg + selectedService.baseFee).toFixed(2);

            setQuoteResult({
                serviceName: selectedService.name,
                cost: estimatedCost,
                estDays: selectedService.estDays,
                origin,
                destination,
                weight: weightVal
            });
            setIsCalculating(false);
        }, 600);
    };

    return (
        <section id="rate-estimator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4">
                        <FaCalculator className="mr-2" /> Instant Logistics Calculator
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
                        Calculate Shipping Cost & Delivery Time
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg">
                        Get transparent, real-time rate estimates for air, ocean, and ground logistics across 150+ international destinations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Input Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md"
                    >
                        <form onSubmit={handleCalculate} className="space-y-6">
                            {/* Origin and Destination */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                        Origin Country
                                    </label>
                                    <select
                                        value={origin}
                                        onChange={(e) => setOrigin(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="United States">United States (USA)</option>
                                        <option value="United Kingdom">United Kingdom (UK)</option>
                                        <option value="Germany">Germany (DE)</option>
                                        <option value="China">China (CN)</option>
                                        <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
                                        <option value="Canada">Canada (CA)</option>
                                        <option value="Nigeria">Nigeria (NG)</option>
                                        <option value="Australia">Australia (AU)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                        Destination Country
                                    </label>
                                    <select
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="United Kingdom">United Kingdom (UK)</option>
                                        <option value="United States">United States (USA)</option>
                                        <option value="Germany">Germany (DE)</option>
                                        <option value="France">France (FR)</option>
                                        <option value="Japan">Japan (JP)</option>
                                        <option value="Brazil">Brazil (BR)</option>
                                        <option value="South Africa">South Africa (ZA)</option>
                                        <option value="Singapore">Singapore (SG)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Weight */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Shipment Weight (KG)
                                    </label>
                                    <span className="text-sm font-bold text-blue-400">{weight} kg</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="500"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full accent-blue-500 bg-slate-700 h-2 rounded-lg cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-slate-400 mt-1">
                                    <span>1 kg (Parcel)</span>
                                    <span>100 kg</span>
                                    <span>500 kg (Cargo)</span>
                                </div>
                            </div>

                            {/* Service Type Selection */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                                    Service Type
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {Object.entries(serviceRates).map(([key, item]) => {
                                        const Icon = item.icon;
                                        const isSelected = serviceType === key;
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setServiceType(key)}
                                                className={`flex flex-col items-center p-3.5 rounded-xl border transition-all duration-200 text-center ${
                                                    isSelected
                                                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                                                        : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500'
                                                }`}
                                            >
                                                <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
                                                <span className="text-xs font-semibold leading-tight">{key.toUpperCase()}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isCalculating}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 text-base"
                            >
                                {isCalculating ? (
                                    <span>Calculating Best Rates...</span>
                                ) : (
                                    <>
                                        <span>Calculate Instant Rate</span>
                                        <FaArrowRight className="w-4 h-4 ml-1" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Results & Assurance Box */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                        <AnimatePresence mode="wait">
                            {quoteResult ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-gradient-to-br from-blue-900/60 to-slate-800 border border-blue-500/40 rounded-2xl p-6 sm:p-8 shadow-xl text-white relative"
                                >
                                    <div className="flex items-center justify-between pb-4 border-b border-blue-500/20 mb-6">
                                        <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Estimated Quote</span>
                                        <span className="inline-flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                                            <FaCheckCircle className="mr-1" /> Best Value
                                        </span>
                                    </div>

                                    <div className="mb-6">
                                        <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-baseline">
                                            <span className="text-lg text-blue-400 font-semibold mr-1">$</span>
                                            {quoteResult.cost}
                                            <span className="text-xs font-normal text-slate-400 ml-2">USD (Estimated)</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">Includes customs processing & insurance surcharge</p>
                                    </div>

                                    <div className="space-y-3.5 bg-slate-900/60 rounded-xl p-4 border border-slate-700/60 text-sm mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Service:</span>
                                            <span className="font-semibold text-white">{quoteResult.serviceName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Route:</span>
                                            <span className="font-semibold text-white">{quoteResult.origin} → {quoteResult.destination}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Weight:</span>
                                            <span className="font-semibold text-white">{quoteResult.weight} KG</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-slate-700/60">
                                            <span className="text-slate-400 flex items-center">
                                                <FaClock className="mr-1.5 text-blue-400" /> Est. Transit Time:
                                            </span>
                                            <span className="font-bold text-blue-400">{quoteResult.estDays}</span>
                                        </div>
                                    </div>

                                    <a
                                        href="#contact"
                                        className="w-full py-3 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl transition-all duration-200 flex items-center justify-center text-sm"
                                    >
                                        Book This Shipment
                                    </a>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[280px]"
                                >
                                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                                        <FaDollarSign className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Instant Pricing Preview</h3>
                                    <p className="text-slate-400 text-sm max-w-xs">
                                        Adjust origin, destination, and parcel weight above to generate your live logistics quotation.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Feature Guarantee Callouts */}
                        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 grid grid-cols-2 gap-4">
                            <div className="flex items-start space-x-3">
                                <FaShieldAlt className="text-blue-400 w-5 h-5 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-xs font-bold text-white uppercase">Guaranteed Security</h4>
                                    <p className="text-xs text-slate-400 mt-0.5">100% insured freight options</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <FaClock className="text-blue-400 w-5 h-5 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-xs font-bold text-white uppercase">On-Time Delivery</h4>
                                    <p className="text-xs text-slate-400 mt-0.5">99.8% on-schedule rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RateEstimator;
