import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'John Smith',
            position: 'CEO, Tech Corp',
            content: 'Sussex Logistics has transformed our supply chain operations. Their reliable service and professional team have been invaluable to our business growth.'
        },
        {
            name: 'Sarah Johnson',
            position: 'Operations Manager, Global Retail',
            content: 'Outstanding service quality and attention to detail. Their tracking system provides real-time updates that help us manage our shipments effectively.'
        }
    ];

    return (
        <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4">
                <div className="w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
                <div className="w-48 h-48 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-48 h-48 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4">What Our Clients Say</h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Hear from our valued customers about their experience working with Sussex Logistics</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative"
                        >
                            <div className="absolute top-4 right-4 text-5xl text-blue-100 font-serif">"</div>
                            <p className="text-gray-600 mb-6 relative z-10">{testimonial.content}</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {testimonial.name[0]}
                                </div>
                                <div className="ml-4">
                                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                                    <p className="text-gray-500">{testimonial.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
