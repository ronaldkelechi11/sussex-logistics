import './PackageDetails.css'
import { useEffect, useState } from "react";
import BackButton from './BackButton'
import { useLocation } from 'react-router-dom';

function PackageDetails() {
    const id = localStorage.getItem("uniqueid")
    const location = useLocation()
    console.log(location);

    const [shipment, setShipment] = useState({
        "id": "0",
        "owner": "placeholder",
        "from": "placeholder",
        "to": "placeholder",
        "address": "placeholder",
        "shipmentDate": "placeholder",
        "expectedDeliveryDate": "placeholder",
        "shippingContent": [
            {
                "content": "",
                "quantity": ""
            },
            {
                "content": "",
                "quantity": ""
            }
        ]
    },)
    const url = "/src/__tests__/dummy.json"

    useEffect(() => {
        let http = new XMLHttpRequest();
        http.open('GET', url);
        http.send();
        http.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                var shipments = JSON.parse(this.responseText)
                var shipmentImlookingFor = shipments.filter(shipmentTag => shipmentTag.id == id)
                shipmentImlookingFor.map(shipmentTag => setShipment(shipmentTag))
            }
        }
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
                                shipment.shippingContent.map(shippingItem => {
                                    return (
                                        <>
                                            <h1>{shipment.shippingContent.indexOf(shippingItem) + 1}</h1>
                                            <h1>{shippingItem.quantity}</h1>
                                            <h1>{shippingItem.content}</h1>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="shipmentTracking"></div>
                </div>
            </div>
        </div>
    )
}

export default PackageDetails
