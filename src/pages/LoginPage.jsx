import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Truck, ArrowLeft, ShieldCheck, KeyRound, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAdmin } from '../api/database.api';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await loginAdmin(formData);
            if (response) {
                toast.success('Login successful!');
                navigate('/admin-dashboard');
            }
        } catch (err) {
            console.error(err);
            setError(typeof err === 'string' ? err : 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
            <ToastContainer position="top-right" theme="dark" />

            {/* Background Decorative Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/30 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* Back to Home Link */}
            <div className="absolute top-6 left-6 z-20">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-800/80 backdrop-blur px-4 py-2 rounded-xl border border-slate-700/60 text-sm font-medium"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Home</span>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-4xl w-full relative z-10 my-12"
            >
                <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-5">

                    {/* Left Form Section (3 cols) */}
                    <div className="p-8 sm:p-10 lg:p-12 md:col-span-3 flex flex-col justify-center">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold uppercase tracking-wider mb-4">
                                <ShieldCheck size={14} /> Admin Access
                            </div>
                            <h2 className="text-3xl font-extrabold text-white tracking-tight">
                                Welcome Back
                            </h2>
                            <p className="text-slate-400 text-sm mt-2">
                                Enter your credentials to manage Sussex Logistics operations.
                            </p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-rose-500/10 border border-rose-500/30 p-4 mb-6 rounded-xl text-rose-400 text-sm flex items-center gap-3"
                            >
                                <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary-400 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="block w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm"
                                        placeholder="admin@sussexlogistics.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary-400 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className="block w-full pl-10 pr-12 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm"
                                        placeholder="••••••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 px-4 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-semibold rounded-xl hover:from-primary-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg shadow-primary-600/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm mt-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <>
                                        <KeyRound size={18} />
                                        <span>Sign In to Dashboard</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>

                    {/* Right Decorative Section (2 cols) */}
                    <div className="hidden md:flex md:col-span-2 relative bg-gradient-to-br from-primary-900 via-slate-900 to-primary-950 p-8 flex-col justify-between border-l border-slate-700/50">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent)] pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-400 mb-6 shadow-inner">
                                <Truck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Management Control
                            </h3>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                Real-time fleet monitoring, shipment status management, rate configurations, and secure database management.
                            </p>
                        </div>

                        <div className="relative z-10 space-y-3 pt-6 border-t border-slate-800">
                            <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                <span>256-Bit SSL Encrypted Access</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-300">
                                <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                                <span>Live System Status: Operational</span>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
