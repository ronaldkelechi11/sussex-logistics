import React, { useState } from 'react';
import { FaShip, FaTruck, FaPlane, FaWarehouse, FaArrowRight, FaGlobeAmericas, FaClock, FaChartLine } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Services = () => {
    const services = [
        {
            icon: FaShip,
            title: 'Ocean Freight',
            description: 'Comprehensive maritime logistics solutions with global reach and efficient cargo handling',
            image: '/images/ocean-freight.jpeg',
            stats: {
                coverage: '150+ Ports',
                time: '15-45 Days',
                reliability: '99.5%'
            },
            features: [
                'Container shipping',
                'Bulk cargo handling',
                'Port-to-port delivery',
                'Real-time tracking'
            ]
        },
        {
            icon: FaTruck,
            title: 'Land Transport',
            description: 'Reliable road freight services with extensive network coverage and timely delivery',
            image: '/images/land-transport.jpg',
            stats: {
                coverage: '48 States',
                time: '1-5 Days',
                reliability: '99.8%'
            },
            features: [
                'Full truckload',
                'Less than truckload',
                'Express delivery',
                'Last-mile service'
            ]
        },
        {
            icon: FaPlane,
            title: 'Air Freight',
            description: 'Fast and secure air cargo services for time-critical shipments worldwide',
            image: '/images/air-freight.jpg',
            stats: {
                coverage: '200+ Cities',
                time: '1-3 Days',
                reliability: '99.9%'
            },
            features: [
                'Express air freight',
                'Charter services',
                'Door-to-door delivery',
                'Temperature-controlled'
            ]
        },
        {
            icon: FaWarehouse,
            title: 'Warehousing',
            description: 'State-of-the-art storage facilities with advanced inventory management systems',
            image: '/images/warehousing.jpg',
            stats: {
                coverage: '50+ Locations',
                capacity: '1M+ sqft',
                reliability: '99.9%'
            },
            features: [
                'Inventory management',
                'Pick and pack',
                'Cross-docking',
                'Climate control'
            ]
        }
    ];

    const [activeService, setActiveService] = useState(null);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden" id="services">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto px-4 sm:px-6">
                        Comprehensive logistics solutions tailored to your needs with cutting-edge technology and global reach
                    </p>
                </div>

                <div className="relative -mx-4 sm:mx-0">
                    <Slider {...sliderSettings} className="service-slider">
                        {services.map((service, index) => (
                            <div key={index} className="px-4">
                                <div
                                    className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
                                    onMouseEnter={() => setActiveService(index)}
                                    onMouseLeave={() => setActiveService(null)}
                                >
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <service.icon className="w-8 h-8 text-primary-600" />
                                            <h3 className="text-2xl font-semibold ml-3">{service.title}</h3>
                                        </div>
                                        <p className="text-gray-600 mb-4">{service.description}</p>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            {Object.entries(service.stats).map(([key, value]) => (
                                                <div key={key} className="text-center">
                                                    <div className="text-primary-600 font-bold">{value}</div>
                                                    <div className="text-sm text-gray-500 capitalize">{key}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Features */}
                                        <div className={`grid grid-cols-2 gap-3 transition-all duration-300 ${activeService === index ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
                                            }`}>
                                            {service.features.map((feature, i) => (
                                                <div key={i} className="flex items-center text-sm text-gray-600">
                                                    <FaArrowRight className="w-3 h-3 text-primary-600 mr-2" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Services;
