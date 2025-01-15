import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Add your form submission logic here
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactInfo = [
        {
            icon: <FaPhone className="text-primary-500" />,
            title: "Phone",
            content: "+1 (224) 230-0187",
            link: "tel:+12242300187"
        },
        {
            icon: <FaEnvelope className="text-primary-500" />,
            title: "Email",
            content: "sussexlogisticsservice@gmail.com",
            link: "mailto:sussexlogisticsservice@gmail.com"
        },
        {
            icon: <FaMapMarkerAlt className="text-primary-500" />,
            title: "Address",
            content: "Salmoor Way, Maryport CA15 8BD, UK",
            link: "https://maps.google.com"
        }
    ];

    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have questions about our services? We're here to help. Contact us using the form below or through our contact information.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        placeholder="Your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Your message"
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="animate-spin mr-2" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary-50 rounded-lg">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                                        <p className="text-gray-600">{info.content}</p>
                                    </div>
                                </div>
                            </a>
                        ))}

                        {/* Map Container */}
                        <div className="bg-white rounded-xl shadow-lg p-2 h-80">
                            <iframe
                                title="Location Map"
                                src="https://www.google.com/maps/embed?pb=your-embed-url"
                                className="w-full h-full rounded-lg"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
