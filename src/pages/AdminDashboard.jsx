import { Loader2, LogOut, NotebookPen, Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { allPackage } from "../api/database.api.js";
import PackageItem from '../components/PackageItem';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomInput from '../components/CustomInput';
import AddPackageModal from '../components/AddPackageModal';
import EditPackageModal from '../components/EditPackageModal';

const Admin = () => {
    const navigate = useNavigate()
    const [fetchedPackages, setFetchedPackages] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    async function fetchPackages() {
        setIsLoading(true)
        setError(null)

        try {
            const { data } = await allPackage()
            setFetchedPackages(data)
        } catch (err) {
            setError('Failed to load packages')
            toast.error('Error loading packages. Please reload the website or check your network')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPackages()
    }, [])

    const filteredPackages = fetchedPackages
        ? fetchedPackages.filter(pkg =>
            (pkg.trackingId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pkg.receiverName?.toLowerCase().includes(searchQuery.toLowerCase())) ?? false
        )
        : [];

    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn');
        navigate('/');
        toast.success('You have been successfully logged out');
    }

    const handleEditClick = (packageData) => {
        setSelectedPackage(packageData);
        setIsEditModalOpen(true);
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-primary/5 to-accent/5'>
            <ToastContainer position="top-right" autoClose={3000} />
            {/* Header */}
            <div className='p-4 bg-white shadow-md fixed w-full z-10'>
                <div className='container mx-auto flex justify-between items-center'>
                    <NavLink reloadDocument className='text-2xl font-bold text-primary'>Admin Dashboard</NavLink>
                    <button
                        onClick={handleLogout}
                        className='flex items-center gap-2 text-gray-600 hover:text-primary transition-colors'
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 pt-24 pb-20">
                {/* Search Bar */}
                <div className="mb-6">
                    <CustomInput
                        type="text"
                        placeholder="Search packages by tracking ID or receiver name..."
                        icon={<Search className="h-5 w-5" />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2 text-gray-600">Loading packages...</span>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-8 bg-white rounded-lg shadow-sm">
                        <span className="text-red-600">{error}</span>
                        <button
                            onClick={fetchPackages}
                            className="mt-2 text-primary hover:underline"
                        >
                            Try again
                        </button>
                    </div>
                ) : !fetchedPackages ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2 text-gray-600">Initializing...</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredPackages.length > 0 ? (
                            filteredPackages.map((item, index) => (
                                <PackageItem
                                    item={item}
                                    key={index}
                                    onDeleteSuccess={fetchPackages}
                                    onEditClick={handleEditClick}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 bg-white rounded-lg shadow-sm">
                                <NotebookPen className="h-12 w-12 text-gray-400 mb-2" />
                                <span className="text-gray-600">
                                    {searchQuery ? 'No packages found matching your search' : 'No packages available'}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Add Package FAB */}
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="fixed bottom-6 right-6 bg-primary-500 text-white rounded-full p-4 shadow-lg hover:bg-primary-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Add new package"
            >
                <Plus className="h-6 w-6" />
            </button>

            {/* Add Package Modal */}
            <AddPackageModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddSuccess={fetchPackages}
            />

            {/* Edit Package Modal */}
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
    )
}

export default Admin