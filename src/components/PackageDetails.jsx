import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from './BackButton';
import { p } from "framer-motion/client";

function PackageDetails() {
    const id = sessionStorage.getItem("uniqueid");

    const url = import.meta.env.VITE_BACKEND_URL;
    const maps_api = import.meta.env.GOOGLE_MAPS_API;

    const [location, setLocation] = useState(null);

    const [shipment, setShipment] = useState({
        id: "",
        receiverName: "",
        receiverAddress: "",
        receiverEmailAddress: "",
        originCountry: "",
        destinationCountry: "",
        shipingDate: "",
        typeOfShipment: "",
        expectedDeliveryDate: "",
        paymentMode: "",
        shipingContent: [
            { content: "", quantity: "", weight: "" }
        ],
        shipingTracking: [
            { datetime: "", activity: "", location: "" }
        ]
    });

    // Function to update the location when a link is clicked
    const showLocationOnMap = (locationName) => {
        setLocation(locationName);
    };

    useEffect(() => {
        axios.get(url + "track/" + id)
            .then((result) => {
                if (result.status === 400) {
                    alert("Invalid tracking code");
                } else {
                    setShipment(result.data);
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Server Error");
            });
    }, []);

    return (
        <div className="min-h-screen bg-[rgb(255,248,232)] to-primary p-6">
            <BackButton />

            {!shipment.receiverName && (
                <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
                    <p className="text-primary font-poppins">Loading...</p>
                </div>
            )}

            {/* It wont show till client details don load */}
            {shipment.receiverName && (
                <div className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-8">

                    <div className=" w-full flex justify-center items-center">
                        <img src="/assets/images/logo_transparent.PNG" alt="" className="w-[150px] h-[150px]" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary text-center uppercase mb-6">Tracking No: <span className="text-black">{id}</span></h2>

                    {/* Delivery Details */}
                    <div className="mb-8 mt-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                            <p><span className="font-bold">Receiver Name:</span> {shipment.receiverName}</p>
                            <p><span className="font-bold">Receiver Email:</span> {shipment.receiverEmailAddress}</p>
                            <p><span className="font-bold">Receiver Address:</span> {shipment.receiverAddress}</p>
                            <p><span className="font-bold">Destination Country:</span> {shipment.destinationCountry}</p>
                            <p><span className="font-bold">Origin Country:</span> {shipment.originCountry}</p>
                            <p><span className="font-bold">Type of Shipment:</span> {shipment.typeOfShipment}</p>
                            <p><span className="font-bold">Shipping Date:</span> {shipment.shipingDate}</p>
                            <p><span className="font-bold">Expected Delivery Date:</span> {shipment.expectedDeliveryDate}</p>
                        </div>
                    </div>

                    {/* Shipment Content */}
                    <div className="mb-8">
                        <div className="grid grid-cols-2 gap-4 text-center font-semibold text-gray-800 bg-indigo-50 p-4 rounded-md shadow">
                            <p>Content</p>
                            <p>Weight (Kg)</p>
                        </div>

                        <div className="text-center text-gray-700 mt-4">
                            {shipment.shipingContent.map((item, index) => (
                                <div key={index} className="grid grid-cols-2 gap-4">
                                    <p><strong> ({item.quantity})</strong> {item.content}</p>
                                    <p>{item.weight}</p>
                                </div>
                            ))}
                        </div>
                        
                    </div>


                    {/* Shipment Travel History */}
                    <div className="mb-8">
                        <div className="grid grid-cols-3 gap-4 text-center font-semibold text-gray-800 bg-indigo-50 p-4 rounded-md shadow">
                            <p>Time</p>
                            <p>Activity</p>
                            <p>Location</p>
                        </div>
                        <div className="text-center flex flex-col gap-3 text-gray-700 mt-4">
                            {shipment.shipingTracking.map((trackingItem, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4 ">
                                    <p>{trackingItem.datetime}</p>
                                    <p>{trackingItem.activity}</p>
                                    <p
                                        className="underline cursor-pointer text-indigo-600 hover:text-indigo-400"
                                        onClick={() => showLocationOnMap(trackingItem.location)}>
                                        {trackingItem.location}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Shipper Details */}
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-4">Shipper Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                            <p><span className="font-bold">Courier:</span> Sussex Freight Carrier: E132DF</p>
                            <p><span className="font-bold">Type of Vessel:</span> Air Freight Carrier</p>
                            <p><span className="font-bold">Type of Delivery:</span> Door-Delivery</p>
                            <p><span className="font-bold">Status:</span> On Transit...</p>
                            <p><span className="font-bold">Agent Name:</span> Steve Harrison</p>
                        </div>
                    </div>




                    {/* Display the map when location is set */}
                    {location && (
                        <div className="mt-8">
                            <h2 className="text-lg font-semibold mb-4">Map for {location}</h2>
                            <iframe
                                title={`Map of ${location}`}
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps/embed/v1/place?q=${location}&key=${maps_api}`}
                            ></iframe>
                        </div>
                    )}


                </div>
            )}

            <div className="contact-section bg-white p-6 shadow-lg rounded-lg mt-8">
                <h2 className="text-lg font-bold mb-4">Need Assistance or Clarification?</h2>
                <p className="text-gray-700 mb-4">For any issues or clarifications regarding your package, please feel free to contact us at:</p>
                <ul className="space-y-2">
                    <li>
                        <a href="mailto:billing4sussexlogistics@gmail.com" className="text-gray-700 underline text-sm text-wrap hover:underline">
                            billing4sussexlogistics@gmail.com
                        </a>
                    </li>
                    <li>
                        <a href="mailto:sussexlogisticsservice@gmail.com" className="text-gray-700 underline text-sm text-wrap hover:underline">
                            sussexlogisticsservice@gmail.com
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default PackageDetails;
