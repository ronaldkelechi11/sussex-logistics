import React from 'react';

const Achievements = () => {
    const stats = [
        { number: '20K+', label: 'Deliveries Completed' },
        { number: '50+', label: 'Countries Served' },
        { number: '99%', label: 'Customer Satisfaction' },
        { number: '500+', label: 'Business Partners' }
    ];

    return (
        <section className="bg-blue-600 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center text-white">
                            <div className="text-4xl font-bold mb-2">{stat.number}</div>
                            <div className="text-blue-100">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
