import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaTruck, FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAdmin } from '../api/database.api';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
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
            console.log(err);

            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <ToastContainer position='top-right' />

            {/* Decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-primary-400/30 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-4xl w-full relative">
                {/* Logo container */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-white p-3 sm:p-4 rounded-full shadow-xl">
                        <FaTruck className="text-3xl sm:text-4xl text-primary-600" />
                    </div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
                    <div className="md:grid md:grid-cols-2">
                        {/* Left side - Login Form */}
                        <div className="p-6 sm:p-8 lg:p-12">
                            <div className="text-center mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                                <p className="text-gray-600 text-sm sm:text-base">Please sign in to continue</p>
                            </div>

                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded animate-shake">
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <FaSpinner className="animate-spin" />
                                            <span>Signing in...</span>
                                        </>
                                    ) : (
                                        <span>Sign in</span>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Right side - Decorative */}
                        <div className="hidden md:block relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 lg:p-12 text-white text-center">
                                    <h3 className="text-2xl font-bold mb-4">Sussex Logistics Admin Portal</h3>
                                    <p className="text-primary-100 max-w-sm">
                                        Access your dashboard to manage shipments, track deliveries, and more.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
