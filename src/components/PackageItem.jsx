import { motion } from "framer-motion";
import { useState } from "react";
import { deletePackage } from "../api/database.api.js";
import { toast } from "react-toastify";
import { Loader2, MapPin, Mail, User, Package, Copy, Trash2, Edit3, ArrowRight } from "lucide-react";
import { getCountryFlag } from '../utils/countryFlags';

const PackageItem = ({ item, onDeleteSuccess, onEditClick }) => {
    const [isLoading, setIsLoading] = useState(false);

    async function handleDelete() {
        if (!window.confirm(`Are you sure you want to delete package ${item?.trackingId}?`)) {
            return;
        }

        setIsLoading(true);
        try {
            await deletePackage({ trackingId: item?.trackingId });
            toast.success("Package deleted successfully");
            onDeleteSuccess();
        } catch (error) {
            toast.error("Failed to delete package");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const copyTrackingId = () => {
        if (item?.trackingId) {
            navigator.clipboard.writeText(item.trackingId);
            toast.success('Tracking Code Copied');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="w-full rounded-2xl border border-slate-800/80 bg-slate-900/90 p-5 md:p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-2xl hover:shadow-sky-500/5 group">
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-800 text-sky-400 border border-slate-700/60">
                            <Package className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg text-white tracking-wide">{item?.trackingId}</span>
                                <button
                                    onClick={copyTrackingId}
                                    title="Copy Tracking ID"
                                    className="p-1 rounded-md text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors"
                                >
                                    <Copy className="h-3.5 w-3.5" />
                                </button>
                            </div>
                            <p className="text-xs text-slate-400">Carrier: {item?.carrier || 'SUSSEX Express'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize border ${
                            item?.status
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${item?.status ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                            {item?.status ? 'In Transit' : 'On Hold'}
                        </span>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid gap-4 md:grid-cols-2 py-4 text-sm">
                    {/* Sender & Receiver Info */}
                    <div className="space-y-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/50">
                        <div className="flex items-center gap-3">
                            <User className="h-4 w-4 text-slate-500 shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500 uppercase font-medium">Sender</p>
                                <p className="font-medium text-slate-200 truncate">{item?.senderName || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="border-t border-slate-800/40 pt-2 flex items-center gap-3">
                            <User className="h-4 w-4 text-slate-500 shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500 uppercase font-medium">Receiver</p>
                                <p className="font-medium text-slate-200 truncate">{item?.receiverName || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Email & Route Info */}
                    <div className="space-y-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/50">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500 uppercase font-medium">Receiver Email</p>
                                <p className="font-medium text-slate-200 truncate">{item?.receiverEmailAddress || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="border-t border-slate-800/40 pt-2 flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-slate-500 shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500 uppercase font-medium">Route</p>
                                <div className="font-medium text-slate-200 flex items-center gap-2 text-xs sm:text-sm">
                                    <span className="flex items-center gap-1">
                                        {item?.originCountry} {getCountryFlag(item?.originCountry)}
                                    </span>
                                    <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                                    <span className="flex items-center gap-1">
                                        {item?.destinationCountry} {getCountryFlag(item?.destinationCountry)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <span className="text-xs text-slate-500">
                        Type: <span className="text-slate-400 font-medium">{item?.typeOfShipment || 'Parcel'}</span>
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all text-xs font-medium border border-slate-700/80"
                            onClick={() => onEditClick(item)}
                        >
                            <Edit3 className="h-3.5 w-3.5 text-sky-400" />
                            <span>Edit</span>
                        </button>

                        <button
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 transition-all text-xs font-medium disabled:opacity-50"
                            onClick={handleDelete}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    <span>Deleting...</span>
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span>Delete</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PackageItem;
