import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePackage } from "../api/database.api.js";
import { toast } from "react-toastify";
import { Loader2, MapPin, Mail, User, Package, Pencil } from "lucide-react";
import { getCountryFlag } from '../utils/countryFlags';


const PackageItem = ({ item, onDeleteSuccess, onEditClick }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleDelete() {
        setIsLoading(true);
        try {
            const response = await deletePackage({ trackingId: item?.trackingId });

            toast.success("Package deleted successfully");
            onDeleteSuccess();
        } catch (error) {
            toast.error("Failed to delete package");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="w-full rounded-lg border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
                <div className="mb-6 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-lg">{item?.trackingId}</span>
                        </div>
                        <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${item?.status
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {item?.status ? 'On Transit' : 'On Hold'}
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 text-sm md:grid-cols-2 mb-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <div>
                                <p className="text-gray-500">Sender</p>
                                <p className="font-medium">{item?.senderName}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <div>
                                <p className="text-gray-500">Receiver</p>
                                <p className="font-medium">{item?.receiverName}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <div>
                                <p className="text-gray-500">Receiver Email</p>
                                <p className="font-medium break-all">{item?.receiverEmailAddress}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <div>
                                <p className="text-gray-500">Route</p>
                                <p className="font-medium flex flex-wrap gap-1">
                                    <span>
                                        {item?.originCountry}
                                        {getCountryFlag(item?.originCountry)}
                                    </span>
                                    →
                                    <span>
                                        {item?.destinationCountry}
                                        {getCountryFlag(item?.destinationCountry)}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                    <button
                        className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                                <span>Deleting...</span>
                            </div>
                        ) : (
                            "Delete"
                        )}
                    </button>

                    <button
                        className="bg-secondary-900 text-white px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors"
                        onClick={() => onEditClick(item)}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onEditClick(item)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        title="Edit package"
                    >
                        <Pencil className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default PackageItem;