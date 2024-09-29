import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
    const url = import.meta.env.VITE_BACKEND_URL + "admin/add";
    const navigate = useNavigate();

    // State declarations
    const [trackingCode, setTrackingCode] = useState("Tracking Code");
    const [receiverName, setReceiverName] = useState("");
    const [receiverAddress, setReceiverAddress] = useState("");
    const [receiverEmailAddress, setReceiverEmailAddress] = useState("");
    const [originCountry, setOriginCountry] = useState("");
    const [destinationCountry, setDestinationCountry] = useState("");
    const [shipingDate, setShipingDate] = useState("");
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
    const [paymentMode, setPaymentMode] = useState("Transfer");
    const [typeOfShipment, setTypeOfShipment] = useState("");

    // For shipping content
    const [shipingContentArray, setShipingContentArray] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [content, setContent] = useState("");
    const [weight, setWeight] = useState("");

    const addToArray = async () => {
        await setShipingContentArray((prevArray) => [
            ...prevArray,
            { quantity, content, weight: `${weight}Kg` },
        ]);
        setQuantity("");
        setContent("");
        setWeight("");
    };

    // For tracking content
    const [shipingTrackingArray, setShipingTrackingArray] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [activity, setActivity] = useState("");
    const [location, setLocation] = useState("");

    const addToTrackingArray = async () => {
        const dt = `${date} ${time}`;
        setShipingTrackingArray((prevArray) => [
            ...prevArray,
            { datetime: dt, activity, location },
        ]);
        setDate("");
        setTime("");
        setActivity("");
        setLocation("");
    };

    const generateTrackingCode = () => {
        setTrackingCode(Date.now());
    };

    const finish = () => {
        if (trackingCode === "Tracking Code") {
            alert("Tracking code cannot be blank. Please generate a tracking code.");
            return;
        }

        const myObject = {
            id: trackingCode,
            receiverName,
            receiverAddress,
            receiverEmailAddress,
            originCountry,
            destinationCountry,
            shipingDate,
            typeOfShipment,
            expectedDeliveryDate,
            paymentMode,
            shipingContent: shipingContentArray,
            shipingTracking: shipingTrackingArray,
        };

        axios
            .post(url, { myObject })
            .then((result) => {
                if (result.status === 200) {
                    alert(`New package added successfully with tracking code ${trackingCode}`);
                } else {
                    alert("Error saving package to the database.");
                }
            })
            .catch((err) => {
                alert("Error, please make sure all fields are filled.");
                console.error(err);
            });
    };

    return (
        <div className="p-8 bg-[rgb(255,248,232)] min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center font-poppins">Add a New Package</h2>
                <div className="mb-6 flex flex-col">
                    <p className="text-lg font-semibold text-gray-400 mb-2 text-center">{trackingCode}</p>
                    <button
                        onClick={generateTrackingCode}
                        className="px-4 py-2 bg-green-500 self-center text-white rounded hover:bg-blue-600 transition"
                    >
                        Generate
                    </button>
                </div>
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Receiver Name"
                        value={receiverName}
                        onChange={(e) => setReceiverName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Receiver Address"
                        value={receiverAddress}
                        onChange={(e) => setReceiverAddress(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="email"
                        placeholder="Receiver Email Address"
                        value={receiverEmailAddress}
                        onChange={(e) => setReceiverEmailAddress(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Type of Shipment"
                        value={typeOfShipment}
                        onChange={(e) => setTypeOfShipment(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <div className="md:grid grid-cols-2 gap-4 flex flex-col my-5">
                        <div>
                            <label className="block text-black mb-2 font-extrabold">Shipping Date</label>
                            <input
                                type="date"
                                value={shipingDate}
                                onChange={(e) => setShipingDate(e.target.value)}
                                className="w-full p-2 border rounded text-gray-400"
                            />
                        </div>
                        <div>
                            <label className="block text-black mb-2 font-extrabold">Expected Delivery Date</label>
                            <input
                                type="date"
                                value={expectedDeliveryDate}
                                onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                                className="w-full p-2 border rounded text-gray-400"
                            />
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Origin Country"
                        value={originCountry}
                        onChange={(e) => setOriginCountry(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Destination Country"
                        value={destinationCountry}
                        onChange={(e) => setDestinationCountry(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </form>

                {/* Shipping Content Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Content</h3>
                    <div className="space-y-4">
                        {shipingContentArray.map((item, index) => (
                            <div key={index} className="p-4 bg-gray-50 border rounded">
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Content:</strong> {item.content}</p>
                                <p><strong>Weight:</strong> {item.weight}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <div className="md:grid grid-cols-3 gap-4 flex flex-col">
                            <input
                                type="text"
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Weight (KG)"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="p-2 border rounded"
                            />
                        </div>
                        <button
                            onClick={addToArray}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Add Content
                        </button>
                    </div>
                </div>

                {/* Tracking Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipment Tracking</h3>
                    <div className="space-y-4">
                        {shipingTrackingArray.map((item, index) => (
                            <div key={index} className="p-4 bg-gray-50 border rounded">
                                <p><strong>Date/Time:</strong> {item.datetime}</p>
                                <p><strong>Activity:</strong> {item.activity}</p>
                                <p><strong>Location:</strong> {item.location}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 md:grid grid-cols-4 gap-4 flex flex-col">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="p-2 border rounded text-gray-400"
                        />
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="p-2 border rounded text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Activity"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <button
                        onClick={addToTrackingArray}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Add Tracking
                    </button>
                </div>

                {/* Finish Button */}
                <div className="mt-10 flex flex-col gap-3 md:flex-row md:justify-between">
                    <button
                        onClick={finish}
                        className="px-4 py-2 w-full bg-green-500 text-white rounded hover:bg-primary transition"
                    >
                        Finish
                    </button>

                    <button
                        onClick={() => navigate("/admin/edit")}
                        className="px-4 py-2 bg-indigo-500 w-full text-white rounded hover:bg-gray-600 transition"
                    >
                        Edit a Package &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
