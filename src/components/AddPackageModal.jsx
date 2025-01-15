import { X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { addPackage } from "../api/database.api";
import { toast } from "react-toastify";

const AddPackageModal = ({ isOpen, onClose, onAddSuccess }) => {
    const [formData, setFormData] = useState({
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
    });

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

    // Add validation functions
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

        // Email validation
        if (!validateEmail(formData.receiverEmailAddress)) {
            newErrors.receiverEmailAddress = "Please enter a valid email address";
        }

        // Country validations
        if (!formData.originCountry.trim()) {
            newErrors.originCountry = "Origin country is required";

        }
        if (!formData.destinationCountry.trim()) {
            newErrors.destinationCountry = "Destination country is required";

        }
        if (!formData.currentLocation.trim()) {
            newErrors.currentLocation = "Please add a current Location"

        }

        // Date validations
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
            newErrors.typeOfShipment = 'Shipment must have type'

        }

        // Arrays validation
        if (formData.shipingContent.length == 0) {
            newErrors.shipingContent = 'Shiping Content cannot be empty'
        }
        if (formData.shipingTracking.length == 0) {
            newErrors.shipingTracking = 'Shiping Tracking cannot be empty'
        }
        setErrors(newErrors);

        // If no errors, submit the package
        if (Object.keys(newErrors).length === 0) {
            try {
                setIsSubmitting(true);
                await addPackage(formData);
                toast.success('Package added successfully');
                onClose(); // Close modal after successful submission
                onAddSuccess(); // Refresh the package list
            } catch ({ response }) {
                toast.error(response.data.error || "Failed to add package. Please try again.");
                setErrors({
                    submit: "Failed to add package. Please try again."
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Add error message display component
    const ErrorMessage = ({ error }) => {
        if (!error) return null;
        return <span className="text-red-500 text-sm mt-1">{error}</span>;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">Add New Package</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {errors.submit && (
                            <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-2 rounded-md mb-4">
                                {errors.submit}
                            </div>
                        )}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium mb-1">Sender Name</label>
                                <input
                                    type="text"
                                    name="senderName"
                                    value={formData.senderName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter sender name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Sender Email Address</label>
                                <input
                                    type="email"
                                    name="senderEmailAddress"
                                    value={formData.senderEmailAddress}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter sender email address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Sender Address</label>
                                <input
                                    type="text"
                                    name="senderAddress"
                                    value={formData.senderAddress}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter sender address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Sender Telephone</label>
                                <input
                                    type="text"
                                    name="senderTelephone"
                                    value={formData.senderTelephone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter sender telephone"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Receiver Name</label>
                                <input
                                    type="text"
                                    name="receiverName"
                                    value={formData.receiverName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter receiver name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Receiver Address</label>
                                <input
                                    type="text"
                                    name="receiverAddress"
                                    value={formData.receiverAddress}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter receiver address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Receiver Email Address</label>
                                <input
                                    type="email"
                                    name="receiverEmailAddress"
                                    value={formData.receiverEmailAddress}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.receiverEmailAddress ? 'border-red-500' : ''}`}
                                    placeholder="Enter receiver email address"
                                />
                                <ErrorMessage error={errors.receiverEmailAddress} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Receiver Telephone</label>
                                <input
                                    type="text"
                                    name="receiverTelephone"
                                    value={formData.receiverTelephone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter receiver telephone"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Origin Country</label>
                                <input
                                    type="text"
                                    name="originCountry"
                                    value={formData.originCountry}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.originCountry ? 'border-red-500' : ''}`}
                                    placeholder="Enter origin country"
                                />
                                <ErrorMessage error={errors.originCountry} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Destination Country</label>
                                <input
                                    type="text"
                                    name="destinationCountry"
                                    value={formData.destinationCountry}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.destinationCountry ? 'border-red-500' : ''}`}
                                    placeholder="Enter destination country"
                                />
                                <ErrorMessage error={errors.destinationCountry} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Shipping Date</label>
                                <input
                                    type="date"
                                    name="shipingDate"
                                    value={formData.shipingDate}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.shipingDate ? 'border-red-500' : ''}`}
                                />
                                <ErrorMessage error={errors.shipingDate} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Expected Delivery Date</label>
                                <input
                                    type="date"
                                    name="expectedDeliveryDate"
                                    value={formData.expectedDeliveryDate}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.expectedDeliveryDate ? 'border-red-500' : ''}`}
                                />
                                <ErrorMessage error={errors.expectedDeliveryDate} />
                                {errors.dates && <ErrorMessage error={errors.dates} />}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Type of Shipment</label>
                                <input
                                    type="text"
                                    name="typeOfShipment"
                                    value={formData.typeOfShipment}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter type of shipment"
                                />
                                <ErrorMessage error={errors.typeOfShipment} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Carrier</label>
                                <input
                                    type="text"
                                    name="carrier"
                                    value={formData.carrier}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter carrier name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Current Location (Country)</label>
                                <input
                                    type="text"
                                    name="currentLocation"
                                    value={formData.currentLocation}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter Current Location"
                                />
                                <ErrorMessage error={errors.currentLocation} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Comments</label>
                                <textarea
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter comments"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md bg-white"
                                >
                                    <option value={true}>On Transit</option>
                                    <option value={false}>On Hold</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <ErrorMessage error={errors.shipingContent} />
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Shipping Content</h3>
                                <button
                                    type="button"
                                    onClick={addShipingContent}
                                    className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md"
                                >
                                    <Plus className="w-4 h-4" /> Add Item
                                </button>
                            </div>

                            {formData.shipingContent.map((item, index) => (
                                <div key={index} className="grid gap-4 md:grid-cols-2 border p-4 rounded-lg relative">
                                    <button
                                        type="button"
                                        onClick={() => removeShipingContent(index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Content</label>
                                        <input
                                            type="text"
                                            value={item.content}
                                            onChange={(e) => handleContentChange(index, 'content', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Quantity</label>
                                        <input
                                            type="text"
                                            value={item.quantity}
                                            onChange={(e) => handleContentChange(index, 'quantity', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Weight (KG)</label>
                                        <input
                                            type="text"
                                            value={item.weight}
                                            onChange={(e) => handleContentChange(index, 'weight', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Description</label>
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => handleContentChange(index, 'description', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <ErrorMessage error={errors.shipingTracking} />
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Shipping Tracking</h3>
                                <button
                                    type="button"
                                    onClick={addShipingTracking}
                                    className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md"
                                >
                                    <Plus className="w-4 h-4" /> Add Tracking
                                </button>
                            </div>

                            {formData.shipingTracking.map((item, index) => (
                                <div key={index} className="grid gap-4 md:grid-cols-2 border p-4 rounded-lg relative">
                                    <button
                                        type="button"
                                        onClick={() => removeShipingTracking(index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            value={item.datetime}
                                            onChange={(e) => handleTrackingChange(index, 'datetime', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Location (Country)</label>
                                        <input
                                            type="text"
                                            value={item.location}
                                            onChange={(e) => handleTrackingChange(index, 'location', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Remark</label>
                                        <input
                                            type="text"
                                            value={item.remark}
                                            onChange={(e) => handleTrackingChange(index, 'remark', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </form>
                </div>

                <div className="flex justify-end gap-2 p-4 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-900 transition-colors flex items-center gap-2"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="animate-spin">↻</span>
                                Adding Package...
                            </>
                        ) : (
                            'Create Package'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddPackageModal;
