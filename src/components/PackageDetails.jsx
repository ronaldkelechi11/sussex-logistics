import './PackageDetails.css'
import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from './BackButton'
import { useNavigate } from 'react-router-dom';

function PackageDetails() {
    const id = sessionStorage.getItem("uniqueid")
    const url = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const [shipment, setShipment] = useState({
        "id": "",
        "receiverName": "",
        "receiverAddress": "",
        "receiverEmailAddress": "",
        "originCountry": "",
        "destinationCountry": "",
        "shipingDate": "",
        "typeOfShipment": "",
        "expectedDeliveryDate": "",
        "paymentMode": "",
        "shipingContent": [
            {
                "content": "",
                "quantity": "",
                "weight": ""
            }
        ],
        "shipingTracking": [
            {
                "d": "",
                "activity": "",
                "location": ""
            }
        ]
    },)


    useEffect(() => {
        axios.get(url + "track/" + id)
            .then((result) => {
                if (result.status === 400) {
                    alert("Invalid tracking code")
                    navigate("/")
                }
                else {
                    setShipment(result.data)
                }
            }).catch((err) => {
                console.log(err);
                alert("Invalid tracking code")
                navigate("/")
            });
    }, [])

    return (
        <div className="trackingPage">
            <BackButton />
            <div className="packageDetails">
                <div className="child">
                    <div className="header">TRACKING NO: <span>{id}</span></div>
                    <div className="shipmentProfile">
                        <div className="header">Delivery Details</div>
                        <div className="body">
                            <div className="date">Shipping Date: <span>{shipment.shipingDate}</span></div>
                            <div className="expectedDeliveryDate">
                                Expected Delivery Date: <span>{shipment.expectedDeliveryDate}</span>
                            </div>
                            <div className="destination">
                                Destination Country: <span> {shipment.destinationCountry}</span>
                            </div>
                            <div className="origin">
                                Origin Country: <span>{shipment.originCountry}</span>
                            </div>
                            <div className="receiverName">
                                Receiver Name: <span>{shipment.receiverName}</span>
                            </div>
                            <div className="receiverAddress">
                                Receiver Address: <span>{shipment.receiverAddress}</span>
                            </div>
                            <div className="receiverAddress">
                                Receiver Email Address: <span>{shipment.receiverEmailAddress}</span>
                            </div>
                            <div className="receiverAddress">
                                Type of Shipment: <span>{shipment.typeOfShipment}</span>
                            </div>
                        </div>
                    </div>
                    <div className="shipmentDetails">
                        <div className="header">Shipment Content/Description</div>
                        <div className="body">
                            <p>No.</p>
                            <p>Quantity</p>
                            <p>Content</p>
                            <p>Weight(Kg)</p>
                            {
                                shipment.shipingContent.map(shipingItem => {
                                    return (
                                        <>
                                            <h1>{shipment.shipingContent.indexOf(shipingItem) + 1}</h1>
                                            <h1>{shipingItem.quantity}</h1>
                                            <h1>{shipingItem.content}</h1>
                                            <h1>{shipingItem.weight}</h1>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="shipmentTracking">
                        <div className="header">Shipment Travel History</div>
                        <div className="body">
                            <p>Date/Time</p>
                            <p>Activity</p>
                            <p>Location</p>
                            {
                                shipment.shipingTracking.map(trackingItem => {
                                    console.log(trackingItem);
                                    return (
                                        <>
                                            <h1 key={1}>{trackingItem.datetime}</h1>
                                            <h1 key={2}>{trackingItem.activity}</h1>
                                            <h1 className='underlined' key={3}>{trackingItem.location}</h1>
                                        </>
                                    )
                                })

                            }
                        </div>
                    </div>
                    <div className="shipperDetails">
                        <div className="header">Shiper details</div>
                        <div className="body">
                            <p>Courier</p>
                            <p>Type of Vessel</p>
                            <p>Type of Delivery</p>
                            <p>Status</p>
                            <p>Agent Name</p>
                            <p>Comments</p>


                            <h1>Sussex Freight Carrier: E132DF</h1>
                            <h1>Freight Carrier</h1>
                            <h1>Door-Delivery</h1>
                            <h1>Processing...</h1>
                            <h1>Micheal Johannes</h1>
                            <h1></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageDetails
