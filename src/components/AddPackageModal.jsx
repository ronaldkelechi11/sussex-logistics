import { X, Plus, Trash2, User, Package, Calendar, MapPin, Truck, Check, AlertCircle } from "lucide-react";
import { useState } from "react";
import { addPackage } from "../api/database.api";
import { toast } from "react-toastify";

const AddPackageModal = ({ isOpen, onClose, onAddSuccess }) => {
    const initialFormState = {
        senderName: "",
        senderEmailAddress: "",
        senderAddress: "",
        senderTelephone: "",
        receiverName: "",
        receiverAddress: "",
        receiverEmailAddress: "",
        receiverTelephone: "",
        originCountry: "",
        destinationCountry: "",
        shipingDate: "",
        expectedDeliveryDate: "",
        typeOfShipment: "",
        carrier: "SUSSEX Express Logistics",
        comments: "",
        status: "true",
        currentLocation: "",
        shipingContent: [],
        shipingTracking: []
    };

    const [formData, setFormData] = useState(initialFormState);
    const [activeTab, setActiveTab] = useState("parties"); // 'parties', 'shipment', 'content', 'tracking'
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
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

    const handleTrackingChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            shipingTracking: prev.shipingTracking.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addShipingContent = () => {
        setFormData(prev => ({
            ...prev,
            shipingContent: [...prev.shipingContent, {
                content: "",
                quantity: "",
                weight: "",
                description: ""
            }]
        }));
    };

    const addShipingTracking = () => {
        setFormData(prev => ({
            ...prev,
            shipingTracking: [...prev.shipingTracking, {
                datetime: "",
                remark: "",
                location: ""
            }]
        }));
    };

    const removeShipingContent = (index) => {
        setFormData(prev => ({
            ...prev,
            shipingContent: prev.shipingContent.filter((_, i) => i !== index)
        }));
    };

    const removeShipingTracking = (index) => {
        setFormData(prev => ({
            ...prev,
            shipingTracking: prev.shipingTracking.filter((_, i) => i !== index)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateEmail(formData.receiverEmailAddress)) {
            newErrors.receiverEmailAddress = "Please enter a valid receiver email address";
        }
        if (!formData.originCountry?.trim()) {
            newErrors.originCountry = "Origin country is required";
        }
        if (!formData.destinationCountry?.trim()) {
            newErrors.destinationCountry = "Destination country is required";
        }
        if (!formData.currentLocation?.trim()) {
            newErrors.currentLocation = "Please add current location";
        }
        if (!formData.shipingDate) {
            newErrors.shipingDate = "Shipping date is required";
        }
        if (!formData.expectedDeliveryDate) {
            newErrors.expectedDeliveryDate = "Expected delivery date is required";
        }
        if (formData.shipingDate && formData.expectedDeliveryDate) {
            if (!validateDates(formData.shipingDate, formData.expectedDeliveryDate)) {
                newErrors.dates = "Delivery date must be after shipping date";
            }
        }
        if (!formData.typeOfShipment) {
            newErrors.typeOfShipment = 'Shipment type is required';
        }
        if (formData.shipingContent.length === 0) {
            newErrors.shipingContent = 'Please add at least one shipping item content';
        }
        if (formData.shipingTracking.length === 0) {
            newErrors.shipingTracking = 'Please add at least one tracking entry';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setIsSubmitting(true);
                await addPackage(formData);
                toast.success('Package added successfully');
                setFormData(initialFormState);
                onClose();
                onAddSuccess();
            } catch (err) {
                const errorMsg = err?.response?.data?.error || "Failed to add package. Please try again.";
                toast.error(errorMsg);
                setErrors({ submit: errorMsg });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            toast.error("Please fill in all required fields.");
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
                            <h2 className="text-xl font-bold text-white leading-snug">Create New Package</h2>
                            <p className="text-xs text-slate-400">Add shipping details, items, and tracking milestones.</p>
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
                        <span>Package Items ({formData.shipingContent.length})</span>
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
                        <span>Tracking Timeline ({formData.shipingTracking.length})</span>
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

                    <form id="add-package-form" onSubmit={handleSubmit} className="space-y-6">
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
                                                value={formData.senderName}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Sender Email</label>
                                            <input
                                                type="email"
                                                name="senderEmailAddress"
                                                value={formData.senderEmailAddress}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                                placeholder="sender@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Sender Address</label>
                                            <input
                                                type="text"
                                                name="senderAddress"
                                                value={formData.senderAddress}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                                placeholder="Street address, city"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Sender Phone</label>
                                            <input
                                                type="text"
                                                name="senderTelephone"
                                                value={formData.senderTelephone}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                                placeholder="+1 234 567 890"
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
                                                value={formData.receiverName}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                                placeholder="Jane Smith"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Receiver Email *</label>
                                            <input
                                                type="email"
                                                name="receiverEmailAddress"
                                                value={formData.receiverEmailAddress}
                                                onChange={handleChange}
                                                className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-slate-200 text-sm focus:outline-none ${errors.receiverEmailAddress ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'}`}
                                                placeholder="receiver@example.com"
                                            />
                                            <ErrorMessage error={errors.receiverEmailAddress} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Receiver Address</label>
                                            <input
                                                type="text"
                                                name="receiverAddress"
                                                value={formData.receiverAddress}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                                placeholder="Destination street address"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-300 mb-1">Receiver Phone</label>
                                            <input
                                                type="text"
                                                name="receiverTelephone"
                                                value={formData.receiverTelephone}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                                placeholder="+1 987 654 321"
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
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Origin Country *</label>
                                        <input
                                            type="text"
                                            name="originCountry"
                                            value={formData.originCountry}
                                            onChange={handleChange}
                                            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-slate-200 text-sm focus:outline-none ${errors.originCountry ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'}`}
                                            placeholder="United Kingdom"
                                        />
                                        <ErrorMessage error={errors.originCountry} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Destination Country *</label>
                                        <input
                                            type="text"
                                            name="destinationCountry"
                                            value={formData.destinationCountry}
                                            onChange={handleChange}
                                            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-slate-200 text-sm focus:outline-none ${errors.destinationCountry ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'}`}
                                            placeholder="United States"
                                        />
                                        <ErrorMessage error={errors.destinationCountry} />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Current Location *</label>
                                        <input
                                            type="text"
                                            name="currentLocation"
                                            value={formData.currentLocation}
                                            onChange={handleChange}
                                            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-slate-200 text-sm focus:outline-none ${errors.currentLocation ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'}`}
                                            placeholder="Current transit hub or country"
                                        />
                                        <ErrorMessage error={errors.currentLocation} />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Current Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                        >
                                            <option value="true">In Transit</option>
                                            <option value="false">On Hold</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Shipping Date *</label>
                                        <input
                                            type="date"
                                            name="shipingDate"
                                            value={formData.shipingDate}
                                            onChange={handleChange}
                                            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-slate-200 text-sm focus:outline-none ${errors.shipingDate ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'}`}
                                        />
                                        <ErrorMessage error={errors.shipingDate} />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Expected Delivery Date *</label>
                                        <input
                                            type="date"
                                            name="expectedDeliveryDate"
                                            value={formData.expectedDeliveryDate}
                                            onChange={handleChange}
                                            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-slate-200 text-sm focus:outline-none ${errors.expectedDeliveryDate || errors.dates ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'}`}
                                        />
                                        <ErrorMessage error={errors.expectedDeliveryDate} />
                                        <ErrorMessage error={errors.dates} />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Type of Shipment *</label>
                                        <input
                                            type="text"
                                            name="typeOfShipment"
                                            value={formData.typeOfShipment}
                                            onChange={handleChange}
                                            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-slate-200 text-sm focus:outline-none ${errors.typeOfShipment ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'}`}
                                            placeholder="Air Freight, Sea Express, Documents, Parcel..."
                                        />
                                        <ErrorMessage error={errors.typeOfShipment} />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Carrier</label>
                                        <input
                                            type="text"
                                            name="carrier"
                                            value={formData.carrier}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                            placeholder="SUSSEX Express Logistics"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-slate-300 mb-1">Comments / Special Notes</label>
                                        <textarea
                                            name="comments"
                                            rows="3"
                                            value={formData.comments}
                                            onChange={handleChange}
                                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-sky-500"
                                            placeholder="Special handling instructions, customs notes..."
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

                                <ErrorMessage error={errors.shipingContent} />

                                {formData.shipingContent.length === 0 ? (
                                    <div className="text-center py-8 border border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
                                        <p className="text-slate-400 text-sm mb-2">No content items added yet.</p>
                                        <button
                                            type="button"
                                            onClick={addShipingContent}
                                            className="text-xs text-sky-400 hover:underline font-medium"
                                        >
                                            + Click to add first item
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {formData.shipingContent.map((item, index) => (
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
                                                        <label className="block text-xs text-slate-400 mb-1">Item Name / Content</label>
                                                        <input
                                                            type="text"
                                                            value={item.content}
                                                            onChange={(e) => handleContentChange(index, 'content', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                            placeholder="e.g. Laptops & Electronics"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-slate-400 mb-1">Quantity</label>
                                                        <input
                                                            type="text"
                                                            value={item.quantity}
                                                            onChange={(e) => handleContentChange(index, 'quantity', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                            placeholder="e.g. 2 Units"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-slate-400 mb-1">Weight (KG)</label>
                                                        <input
                                                            type="text"
                                                            value={item.weight}
                                                            onChange={(e) => handleContentChange(index, 'weight', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                            placeholder="e.g. 15.5 KG"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-slate-400 mb-1">Description</label>
                                                        <input
                                                            type="text"
                                                            value={item.description}
                                                            onChange={(e) => handleContentChange(index, 'description', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                            placeholder="Optional brief description"
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

                                <ErrorMessage error={errors.shipingTracking} />

                                {formData.shipingTracking.length === 0 ? (
                                    <div className="text-center py-8 border border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
                                        <p className="text-slate-400 text-sm mb-2">No tracking updates added yet.</p>
                                        <button
                                            type="button"
                                            onClick={addShipingTracking}
                                            className="text-xs text-sky-400 hover:underline font-medium"
                                        >
                                            + Click to add first tracking milestone
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {formData.shipingTracking.map((item, index) => (
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
                                                            value={item.datetime}
                                                            onChange={(e) => handleTrackingChange(index, 'datetime', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-slate-400 mb-1">Location (Country / City)</label>
                                                        <input
                                                            type="text"
                                                            value={item.location}
                                                            onChange={(e) => handleTrackingChange(index, 'location', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                            placeholder="e.g. Heathrow Logistics Hub, UK"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-xs text-slate-400 mb-1">Remark / Status Update</label>
                                                        <input
                                                            type="text"
                                                            value={item.remark}
                                                            onChange={(e) => handleTrackingChange(index, 'remark', e.target.value)}
                                                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                                                            placeholder="e.g. Parcel received at distribution hub"
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
                        form="add-package-form"
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="animate-spin text-white">↻</span>
                                <span>Creating Package...</span>
                            </>
                        ) : (
                            <>
                                <Check className="w-4 h-4" />
                                <span>Save & Create Package</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPackageModal;
