import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle, FaSearch } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            question: "How do I track my shipment with Sussex Logistics?",
            answer: "Tracking your package is simple! Enter your tracking number into the Tracking Bar at the top of our homepage or on the Package Tracking page. You will immediately see real-time updates, route history, estimated delivery date, and current package status."
        },
        {
            question: "What types of freight and transport services do you offer?",
            answer: "We offer comprehensive global shipping solutions including Air Freight (Express 1-3 days), Ocean Cargo (Full & Less Container Load), Road/Land Logistics, Temperature-Controlled Warehousing, and Last-Mile Express Delivery."
        },
        {
            question: "What items are prohibited from international transport?",
            answer: "Prohibited items include hazardous explosives, flammable gases, toxic chemicals, illegal substances, and restricted currency/weapons. Please consult our support team or check local customs guidance prior to booking."
        },
        {
            question: "How are customs duty and import taxes handled?",
            answer: "Our international freight team manages customs documentation on your behalf. Standard quotes include customs clearance documentation processing; customs duties levied by destination authorities are calculated upon arrival."
        },
        {
            question: "Is cargo insurance included with my delivery?",
            answer: "Basic carrier liability is included with all shipments. For high-value goods, we offer full-value comprehensive marine and air cargo insurance for complete peace of mind."
        },
        {
            question: "What should I do if my package appears delayed or held in customs?",
            answer: "Customs processing times vary depending on the destination country. Check your tracking timeline for specific remarks. If additional documents are needed, our customer support team (+1 224-230-0187) will contact you immediately."
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 bg-slate-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-3">
                        <FaQuestionCircle className="mr-1.5" /> Frequently Asked Questions
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Got Questions? We Have Answers.
                    </h2>
                    <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
                        Find quick answers to common questions regarding tracking, shipping rates, customs clearance, and global freight options.
                    </p>

                    {/* Search Input */}
                    <div className="mt-8 max-w-md mx-auto relative">
                        <FaSearch className="absolute left-4 top-3.5 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search questions (e.g., tracking, customs, insurance)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* FAQ Accordions */}
                <div className="space-y-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-200 hover:border-slate-300"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-6 py-5 text-left flex justify-between items-center space-x-4 focus:outline-none"
                                    >
                                        <span className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                                            {faq.question}
                                        </span>
                                        <div className={`p-2 rounded-full transition-transform duration-300 ${isOpen ? 'bg-blue-50 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                                            <FaChevronDown className="w-4 h-4" />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                            >
                                                <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500">No questions found matching "{searchQuery}".</p>
                            <a href="#contact" className="text-blue-600 font-semibold text-sm hover:underline mt-2 inline-block">
                                Contact our 24/7 Support Team
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
