import { useState } from 'react';
import { FaSearch, FaTruckMoving } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const navigate = useNavigate();

    const handleTracking = (e) => {
        e.preventDefault();
        navigate(`/package/${trackingNumber}`);
        console.log('Tracking number:', trackingNumber);
    };

    return (
        <section className="relative min-h-[calc(100vh-4rem)] lg:min-h-screen bg-gradient-to-r from-gray-900/90 to-gray-800/90" id="home">
            <div className="absolute inset-0">
                <img
                    src="/images/logistics-hero.jpg"
                    alt="Logistics Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 pt-24 md:pt-32 pb-16">
                <div className="flex flex-col items-center">
                    <div className="text-white space-y-6 max-w-2xl text-center px-4 sm:px-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Your Trusted Partner in Global Logistics
                        </h1>
                        <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto">
                            Delivering excellence across continents with speed, security, and reliability
                        </p>

                        {/* Tracking Form */}
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-6 mt-8 w-full">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4">Track Your Shipment</h2>
                            <form onSubmit={handleTracking} className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder="Enter tracking number"
                                    className="flex-1 px-4 py-3 rounded-md bg-white/90 text-gray-800 placeholder-gray-500"
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-md font-medium transition-colors flex items-center justify-center"
                                >
                                    <FaSearch className="mr-2" />
                                    Track Now
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Animated Truck - Responsive adjustments */}
                    <div className="mt-8 sm:mt-12 w-full max-w-md relative overflow-hidden">
                        <div className="relative h-16">
                            <div className="absolute right-0 animate-drive">
                                <FaTruckMoving className="text-white w-12 h-12" />
                            </div>
                            <div className="absolute inset-0 flex items-center mt-[18px]">
                                <div className="w-full border-b-2 border-dashed border-white"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
