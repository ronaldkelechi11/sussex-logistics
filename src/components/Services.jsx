import React from 'react';
import { FaShip, FaTruck, FaPlane, FaWarehouse } from 'react-icons/fa';

const Services = () => {
    const services = [
        {
            icon: FaShip,
            title: 'Ocean Freight',
            description: 'International sea freight solutions for large shipments'
        },
        {
            icon: FaTruck,
            title: 'Land Transport',
            description: 'Nationwide road freight and distribution services'
        },
        {
            icon: FaPlane,
            title: 'Air Freight',
            description: 'Express air freight services for time-sensitive cargo'
        },
        {
            icon: FaWarehouse,
            title: 'Warehousing',
            description: 'Secure storage and inventory management solutions'
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
