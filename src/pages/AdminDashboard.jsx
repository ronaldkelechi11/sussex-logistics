import {
    Loader2, LogOut, NotebookPen, Plus, Search,
    Package, LayoutDashboard, Settings, Menu, X,
    TrendingUp, Clock, CheckCircle2, AlertCircle, RefreshCw, Filter
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { allPackage } from "../api/database.api.js";
import PackageItem from '../components/PackageItem';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomInput from '../components/CustomInput';
import AddPackageModal from '../components/AddPackageModal';
import EditPackageModal from '../components/EditPackageModal';

const Admin = () => {
    const navigate = useNavigate();
    const [fetchedPackages, setFetchedPackages] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'transit', 'hold'
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    async function fetchPackages() {
        setIsLoading(true);
        setError(null);

        try {
            const res = await allPackage();
            const data = res?.data;
            const packageList = Array.isArray(data)
                ? data
                : Array.isArray(data?.packages)
                    ? data.packages
                    : Array.isArray(data?.data)
                        ? data.data
                        : [];
            setFetchedPackages(packageList);
        } catch (err) {
            setError('Failed to load packages');
            setFetchedPackages([]);
            toast.error('Error loading packages. Please reload or check your network connection.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPackages();
    }, []);

    const filteredPackages = fetchedPackages
        ? fetchedPackages.filter(pkg => {
            const matchesSearch =
                (pkg.trackingId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 pkg.receiverName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 pkg.senderName?.toLowerCase().includes(searchQuery.toLowerCase())) ?? false;

            if (statusFilter === 'transit') {
                return matchesSearch && pkg.status === true;
            } else if (statusFilter === 'hold') {
                return matchesSearch && pkg.status === false;
            }
            return matchesSearch;
        })
        : [];

    const totalPackages = fetchedPackages ? fetchedPackages.length : 0;
    const inTransitCount = fetchedPackages ? fetchedPackages.filter(p => p.status === true).length : 0;
    const onHoldCount = fetchedPackages ? fetchedPackages.filter(p => p.status === false).length : 0;

    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn');
        navigate('/');
        toast.success('You have been successfully logged out');
    };

    const handleEditClick = (packageData) => {
        setSelectedPackage(packageData);
        setIsEditModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-poppins">
            <ToastContainer position="top-right" autoClose={3000} theme="dark" />

            {/* Mobile Header Toggle */}
            <div className="md:hidden bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-tr from-blue-600 to-sky-400 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
                        <Package className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight text-white">Sussex Admin</h1>
                        <p className="text-xs text-slate-400">Logistics Operations</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-slate-300 hover:text-white bg-slate-800/80 rounded-lg border border-slate-700"
                >
                    {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800/80 flex flex-col justify-between p-5 transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="space-y-8">
                    {/* Brand */}
                    <div className="hidden md:flex items-center gap-3 px-2">
                        <div className="bg-gradient-to-tr from-blue-600 to-sky-400 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/25">
                            <Package className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl leading-tight text-white tracking-wide">SUSSEX</h1>
                            <p className="text-xs text-sky-400 font-medium tracking-wider uppercase">Logistics Admin</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1.5">
                        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Main Navigation</p>
                        <button className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-medium shadow-lg shadow-blue-600/20">
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Dashboard</span>
                        </button>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all group"
                        >
                            <Plus className="h-5 w-5 group-hover:scale-110 transition-transform text-sky-400" />
                            <span>Create Package</span>
                        </button>
                    </nav>
                </div>

                {/* Bottom user profile & logout */}
                <div className="pt-6 border-t border-slate-800 space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sky-400">
                            SA
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">System Administrator</p>
                            <p className="text-xs text-slate-400 truncate">admin@sussex.com</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all font-medium text-sm"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 overflow-y-auto bg-slate-950 p-4 md:p-8">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Overview Dashboard</h2>
                        <p className="text-slate-400 text-sm mt-1">Manage, track, and dispatch cargo packages globally.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchPackages}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-sm font-medium"
                            title="Refresh data"
                        >
                            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
                            <span className="hidden sm:inline">Refresh</span>
                        </button>

                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-medium shadow-lg shadow-blue-500/20 transition-all text-sm"
                        >
                            <Plus className="h-4 w-4" />
                            <span>New Shipment</span>
                        </button>
                    </div>
                </div>

                {/* Stats Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-sm hover:border-slate-700/80 transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-sky-400">
                            <Package className="h-16 w-16" />
                        </div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Packages</p>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-3xl font-bold text-white">{totalPackages}</span>
                            <span className="text-xs text-sky-400 font-medium">Recorded</span>
                        </div>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-sm hover:border-slate-700/80 transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-emerald-400">
                            <TrendingUp className="h-16 w-16" />
                        </div>
                        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">In Transit</p>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-3xl font-bold text-white">{inTransitCount}</span>
                            <span className="text-xs text-emerald-400 font-medium">Active Shipments</span>
                        </div>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-sm hover:border-slate-700/80 transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-amber-400">
                            <Clock className="h-16 w-16" />
                        </div>
                        <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">On Hold</p>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-3xl font-bold text-white">{onHoldCount}</span>
                            <span className="text-xs text-amber-400 font-medium">Pending Action</span>
                        </div>
                    </div>
                </div>

                {/* Filters & Search Controls */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="w-full md:w-96 relative">
                        <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search tracking ID, sender or receiver..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                        <Filter className="h-4 w-4 text-slate-400 mr-1 flex-shrink-0" />
                        <span className="text-xs text-slate-400 font-medium mr-2 flex-shrink-0">Status:</span>
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                statusFilter === 'all'
                                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                    : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-slate-800'
                            }`}
                        >
                            All ({totalPackages})
                        </button>
                        <button
                            onClick={() => setStatusFilter('transit')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                statusFilter === 'transit'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-slate-800'
                            }`}
                        >
                            In Transit ({inTransitCount})
                        </button>
                        <button
                            onClick={() => setStatusFilter('hold')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                statusFilter === 'hold'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-slate-800'
                            }`}
                        >
                            On Hold ({onHoldCount})
                        </button>
                    </div>
                </div>

                {/* Package List Container */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800/60">
                        <Loader2 className="h-10 w-10 animate-spin text-sky-400 mb-3" />
                        <span className="text-slate-400 text-sm">Fetching shipments...</span>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-slate-900/40 rounded-2xl border border-rose-500/20">
                        <AlertCircle className="h-10 w-10 text-rose-400 mb-2" />
                        <span className="text-rose-400 font-medium">{error}</span>
                        <button
                            onClick={fetchPackages}
                            className="mt-3 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
                        >
                            Retry Request
                        </button>
                    </div>
                ) : !fetchedPackages ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800/60">
                        <Loader2 className="h-10 w-10 animate-spin text-sky-400 mb-3" />
                        <span className="text-slate-400 text-sm">Initializing system...</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredPackages.length > 0 ? (
                            filteredPackages.map((item, index) => (
                                <PackageItem
                                    item={item}
                                    key={item._id || index}
                                    onDeleteSuccess={fetchPackages}
                                    onEditClick={handleEditClick}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800/60 text-center px-4">
                                <NotebookPen className="h-12 w-12 text-slate-600 mb-3" />
                                <h3 className="text-slate-300 font-semibold text-lg">No Packages Found</h3>
                                <p className="text-slate-500 text-sm max-w-sm mt-1">
                                    {searchQuery || statusFilter !== 'all'
                                        ? 'No records matched your search or status filter criteria.'
                                        : 'There are no active shipments in the database right now.'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Modals */}
            <AddPackageModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddSuccess={fetchPackages}
            />

            <EditPackageModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedPackage(null);
                }}
                onEditSuccess={fetchPackages}
                packageData={selectedPackage}
            />
        </div>
    );
};

export default Admin;
