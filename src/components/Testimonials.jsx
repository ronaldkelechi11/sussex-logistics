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
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                            <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                            <div>
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
