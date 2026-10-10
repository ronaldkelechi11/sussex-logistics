import { X, Plus, Trash2, User, Package, Calendar, MapPin, Truck, Check, AlertCircle, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { updatePackage } from "../api/database.api";
import { toast } from "react-toastify";

const EditPackageModal = ({ isOpen, onClose, onEditSuccess, packageData }) => {
    const [formData, setFormData] = useState({
        ...packageData,
        shipingContent: packageData?.shipingContent || [],
        shipingTracking: packageData?.shipingTracking || []
    });
    const [activeTab, setActiveTab] = useState("parties"); // 'parties', 'shipment', 'content', 'tracking'
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (packageData) {
            setFormData({
                ...packageData,
                shipingContent: packageData.shipingContent || [],
                shipingTracking: packageData.shipingTracking || []
            });
        }
    }, [packageData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addShipingContent = () => {
        setFormData(prev => ({
            ...prev,
            shipingContent: [...prev.shipingContent, {
                content: '',
                quantity: '',
                weight: '',
                description: ''
            }]
        }));
    };

    const removeShipingContent = (index) => {
        setFormData(prev => ({
            ...prev,
            shipingContent: prev.shipingContent.filter((_, i) => i !== index)
        }));
    };

    const handleContentChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            shipingContent: prev.shipingContent.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addShipingTracking = () => {
        setFormData(prev => ({
            ...prev,
            shipingTracking: [...prev.shipingTracking, {
                datetime: '',
                location: '',
                remark: ''
            }]
        }));
    };

    const removeShipingTracking = (index) => {
        setFormData(prev => ({
            ...prev,
            shipingTracking: prev.shipingTracking.filter((_, i) => i !== index)
        }));
    };

    const handleTrackingChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            shipingTracking: prev.shipingTracking.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateDates = (shippingDate, deliveryDate) => {
        const shipping = new Date(shippingDate);
        const delivery = new Date(deliveryDate);
        return shipping < delivery;
    };

    const copyTrackingId = () => {
        if (formData?.trackingId) {
            navigator.clipboard.writeText(formData.trackingId);
            toast.success('Tracking Code Copied');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (formData.receiverEmailAddress && !validateEmail(formData.receiverEmailAddress)) {
            newErrors.receiverEmailAddress = "Please enter a valid receiver email address";
        }
        if (formData.shipingDate && formData.expectedDeliveryDate) {
            if (!validateDates(formData.shipingDate, formData.expectedDeliveryDate)) {
                newErrors.dates = "Delivery date must be after shipping date";
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setIsSubmitting(true);
                await updatePackage(formData.trackingId, formData);
                toast.success('Package updated successfully');
                onClose();
                onEditSuccess();
            } catch (err) {
                const errorMsg = err?.response?.data?.error || "Failed to update package. Please try again.";
                toast.error(errorMsg);
                setErrors({ submit: errorMsg });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            toast.error("Please review form errors before submitting.");
        }
    };

    const ErrorMessage = ({ error }) => {
        if (!error) return null;
        return <span className="text-rose-400 text-xs mt-1 block">{error}</span>;
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-poppins">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-800/80 bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-xl">
                            <Package className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-white leading-snug">Edit Package</h2>
                                <span className="bg-slate-800 text-sky-400 font-mono text-xs px-2.5 py-0.5 rounded-md border border-slate-700 flex items-center gap-1">
                                    {formData?.trackingId}
                                    <button
                                        onClick={copyTrackingId}
                                        type="button"
                                        className="hover:text-white transition-colors"
                                        title="Copy Tracking ID"
                                    >
                                        <Copy className="h-3 w-3" />
                                    </button>
                                </span>
                            </div>
                            <p className="text-xs text-slate-400">Update shipment details, contents, or status progression.</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-slate-800 bg-slate-950/40 px-5 gap-2 overflow-x-auto text-xs font-medium">
                    <button
                        type="button"
                        onClick={() => setActiveTab("parties")}
                        className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                            activeTab === "parties"
                                ? "border-sky-500 text-sky-400 font-semibold"
                                : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                    >
                        <User className="h-4 w-4" />
                        <span>Sender & Receiver</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("shipment")}
                        className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                            activeTab === "shipment"
                                ? "border-sky-500 text-sky-400 font-semibold"
                                : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                    >
                        <Truck className="h-4 w-4" />
                        <span>Shipment Details</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("content")}
                        className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                            activeTab === "content"
                                ? "border-sky-500 text-sky-400 font-semibold"
                                : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                    >
                        <Package className="h-4 w-4" />
                        <span>Package Items ({formData.shipingContent?.length || 0})</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("tracking")}
                        className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                            activeTab === "tracking"
                                ? "border-sky-500 text-sky-400 font-semibold"
                                : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                    >
                        <MapPin className="h-4 w-4" />
                        <span>Tracking Timeline ({formData.shipingTracking?.length || 0})</span>
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 overflow-y-auto flex-1 space-y-4">
                    {errors.submit && (
                        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-sm flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <span>{errors.submit}</span>
                        </div>
                    )}

                    <form id="edit-package-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Tab 1: Sender & Receiver */}
                        {activeTab === "parties" && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                                        <User className="h-4 w-4" /> Sender Information
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Sender Name</label>
                                            <input
                                                type="text"
                                                name="senderName"
                                                value={formData.senderName || ''}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Sender Email</label>
                                            <input
                                                type="email"
                                                name="senderEmailAddress"
                                                value={formData.senderEmailAddress || ''}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Sender Address</label>
                                            <input
                                                type="text"
                                                name="senderAddress"
                                                value={formData.senderAddress || ''}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Sender Phone</label>
                                            <input
                                                type="text"
                                                name="senderTelephone"
                                                value={formData.senderTelephone || ''}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-800 pt-6 space-y-4">
                                    <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                                        <User className="h-4 w-4" /> Receiver Information
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Receiver Name</label>
                                            <input
                                                type="text"
                                                name="receiverName"
                                                value={formData.receiverName || ''}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Receiver Email</label>
                                            <input
                                                type="email"
                                                name="receiverEmailAddress"
                                                value={formData.receiverEmailAddress || ''}
                                                onChange={handleChange}
                                                className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-slate-200 text-sm focus:outline-none ${errors.receiverEmailAddress ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'}`}
                                            />
                                            <ErrorMessage error={errors.receiverEmailAddress} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Receiver Address</label>
                                            <input
                                                type="text"
                                                name="receiverAddress"
                                                value={formData.receiverAddress || ''}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Receiver Phone</label>
                                            <input
                                                type="text"
                                                name="receiverTelephone"
                                                value={formData.receiverTelephone || ''}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 2: Shipment Details */}
                        {activeTab === "shipment" && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                                    <Truck className="h-4 w-4" /> Route & Status Details
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Origin Country</label>
                                        <input
                                            type="text"
                                            name="originCountry"
                                            value={formData.originCountry || ''}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Destination Country</label>
                                        <input
                                            type="text"
                                            name="destinationCountry"
                                            value={formData.destinationCountry || ''}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Current Location</label>
                                        <input
                                            type="text"
                                            name="currentLocation"
                                            value={formData.currentLocation || ''}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Current Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                        >
                                            <option value={true}>In Transit</option>
                                            <option value={false}>On Hold</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Shipping Date</label>
                                        <input
                                            type="date"
                                            name="shipingDate"
                                            value={formData.shipingDate || ''}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Expected Delivery Date</label>
                                        <input
                                            type="date"
                                            name="expectedDeliveryDate"
                                            value={formData.expectedDeliveryDate || ''}
                                            onChange={handleChange}
                                            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-slate-200 text-sm focus:outline-none ${errors.dates ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'}`}
                                        />
                                        <ErrorMessage error={errors.dates} />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Type of Shipment</label>
                                        <input
                                            type="text"
                                            name="typeOfShipment"
                                            value={formData.typeOfShipment || ''}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Carrier</label>
                                        <input
                                            type="text"
                                            name="carrier"
                                            value={formData.carrier || ''}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Comments / Special Notes</label>
                                        <textarea
                                            name="comments"
                                            rows="3"
                                            value={formData.comments || ''}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Package Items */}
                        {activeTab === "content" && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                                        <Package className="h-4 w-4" /> Package Contents
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={addShipingContent}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white rounded-xl transition-all"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Content Item
                                    </button>
                                </div>

                                {formData.shipingContent?.length === 0 ? (
                                    <div className="text-center py-8 border border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
                                        <p className="text-slate-400 text-sm mb-2">No content items recorded.</p>
                                        <button
                                            type="button"
                                            onClick={addShipingContent}
                                            className="text-xs text-sky-400 hover:underline font-medium"
                                        >
                                            + Click to add item
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {formData.shipingContent?.map((item, index) => (
                                            <div key={index} className="bg-slate-950 border border-slate-800 p-4 rounded-xl relative space-y-3">
                                                <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                                                    <span className="text-xs font-semibold text-slate-400">Item #{index + 1}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeShipingContent(index)}
                                                        className="text-rose-400 hover:text-rose-300 p-1 rounded-lg hover:bg-rose-500/10 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="grid gap-3 md:grid-cols-2">
                                                    <div>
                                                        <label className="block text-xs text-slate-400 mb-1">Content</label>
                                                        <input
                                                            type="text"
                                                            value={item.content || ''}
                                                            onChange={(e) => handleContentChange(index, 'content', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-slate-400 mb-1">Quantity</label>
                                                        <input
                                                            type="text"
                                                            value={item.quantity || ''}
                                                            onChange={(e) => handleContentChange(index, 'quantity', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-slate-400 mb-1">Weight (KG)</label>
                                                        <input
                                                            type="text"
                                                            value={item.weight || ''}
                                                            onChange={(e) => handleContentChange(index, 'weight', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-slate-400 mb-1">Description</label>
                                                        <input
                                                            type="text"
                                                            value={item.description || ''}
                                                            onChange={(e) => handleContentChange(index, 'description', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tab 4: Tracking Timeline */}
                        {activeTab === "tracking" && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                                        <MapPin className="h-4 w-4" /> Tracking Milestones
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={addShipingTracking}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white rounded-xl transition-all"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Milestone
                                    </button>
                                </div>

                                {formData.shipingTracking?.length === 0 ? (
                                    <div className="text-center py-8 border border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
                                        <p className="text-slate-400 text-sm mb-2">No tracking updates recorded.</p>
                                        <button
                                            type="button"
                                            onClick={addShipingTracking}
                                            className="text-xs text-sky-400 hover:underline font-medium"
                                        >
                                            + Click to add tracking milestone
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {formData.shipingTracking?.map((item, index) => (
                                            <div key={index} className="bg-slate-950 border border-slate-800 p-4 rounded-xl relative space-y-3">
                                                <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                                                    <span className="text-xs font-semibold text-slate-400">Milestone #{index + 1}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeShipingTracking(index)}
                                                        className="text-rose-400 hover:text-rose-300 p-1 rounded-lg hover:bg-rose-500/10 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="grid gap-3 md:grid-cols-2">
                                                    <div>
                                                        <label className="block text-xs text-slate-400 mb-1">Date & Time</label>
                                                        <input
                                                            type="datetime-local"
                                                            value={item.datetime || ''}
                                                            onChange={(e) => handleTrackingChange(index, 'datetime', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-slate-400 mb-1">Location</label>
                                                        <input
                                                            type="text"
                                                            value={item.location || ''}
                                                            onChange={(e) => handleTrackingChange(index, 'location', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-xs text-slate-400 mb-1">Remark</label>
                                                        <input
                                                            type="text"
                                                            value={item.remark || ''}
                                                            onChange={(e) => handleTrackingChange(index, 'remark', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </form>
                </div>

                {/* Sticky Action Footer */}
                <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-950/60">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl text-xs font-medium transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        form="edit-package-form"
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="animate-spin text-white">↻</span>
                                <span>Updating Package...</span>
                            </>
                        ) : (
                            <>
                                <Check className="w-4 h-4" />
                                <span>Save Changes</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPackageModal;
