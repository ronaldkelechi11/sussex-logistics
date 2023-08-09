import './PackageDetails.css'
import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from './BackButton'
import { useNavigate } from 'react-router-dom';

function PackageDetails() {
    const id = localStorage.getItem("uniqueid")
    const url = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const [shipment, setShipment] = useState({
        "id": "0",
        "owner": "",
        "from": "",
        "to": "",
        "address": "",
        "shipmentDate": "",
        "expectedDeliveryDate": "",
        "shipingContent": [
            {
                "content": "",
                "quantity": ""
            },
            {
                "content": "",
                "quantity": ""
            }
        ],
        "shipingTracking": [
            {
                "dt": "",
                "activity": "",
                "location": ""
            },
            {
                "dt": "",
                "activity": "",
                "location": ""
            },
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
                            <div className="date">Shipping Date <span>{shipment.shipmentDate}</span></div>
                            <div className="expectedDeliveryDate">
                                Expected Delivery Date <span>{shipment.expectedDeliveryDate}</span>
                            </div>
                            <div className="destination">
                                Destination <span> {shipment.to}</span>
                            </div>
                            <div className="origin">
                                Origin <span>{shipment.from}</span>
                            </div>
                            <div className="receiverName">
                                Receiver Name <span>{shipment.owner}</span>
                            </div>
                            <div className="receiverAddress">
                                Receiver Address <span>{shipment.address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="shipmentDetails">
                        <div className="header">Shipment Content/Description</div>
                        <div className="body">
                            <p>NO</p>
                            <p>QTY</p>
                            <p>Content</p>
                            {
                                shipment.shipingContent.map(shipingItem => {
                                    return (
                                        <>
                                            <h1>{shipment.shipingContent.indexOf(shipingItem) + 1}</h1>
                                            <h1>{shipingItem.quantity}</h1>
                                            <h1>{shipingItem.content}</h1>
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
                                    return (
                                        <>
                                            <h1 key={1}>{trackingItem.dt}</h1>
                                            <h1 key={2}>{trackingItem.activity}</h1>
                                            <h1 key={3}>{trackingItem.location}</h1>
                                        </>
                                    )
                                })

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageDetails
