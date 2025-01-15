import React from 'react';
import { Link } from 'react-router-dom';
import { PackageX, Home, Search } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center p-4">
            {/* Decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-primary-400/30 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 text-center relative z-10">
                <div className="mb-8">
                    <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <PackageX className="w-12 h-12 text-red-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-xl text-gray-600 mb-2">Page Not Found</p>
                    <p className="text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
                </div>

                <div className="space-y-4">
                    <Link 
                        to="/"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                    
                    <Link
                        to="/track"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-200"
                    >
                        <Search className="w-4 h-4" />
                        Track a Package
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Need help? <a href="/contact" className="text-primary-600 hover:text-primary-700">Contact our support team</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
