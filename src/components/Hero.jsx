import React from 'react';

const Hero = () => {
    return (
        <section className="relative h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="absolute inset-0 bg-[url('/logistics-bg.jpg')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold mb-6">Global Logistics Solutions for Your Business</h1>
                    <p className="text-xl mb-8">Reliable, efficient, and secure shipping services worldwide</p>
                    <div className="space-x-4">
                        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-md font-medium transition-colors">
                            Get Started
                        </button>
                        <button className="border border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-md font-medium transition-colors">
                            Track Shipment
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
