import React from 'react';

const About = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <img 
                            src="/about-image.jpg" 
                            alt="Logistics Operations" 
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6">About Sussex Logistics</h2>
                        <p className="text-gray-600 mb-6">
                            With over 20 years of experience in global logistics, we provide 
                            comprehensive supply chain solutions tailored to your business needs.
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Global network coverage',
                                'Modern fleet and facilities',
                                'Expert logistics professionals',
                                'Advanced tracking systems'
                            ].map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
