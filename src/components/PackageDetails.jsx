import './PackageDetails.css'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import BackButton from './BackButton'
import { useAsyncError, useNavigate } from 'react-router-dom';

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

    const [mapIsShowing, setMapIsShowing] = useState(false)
    const [clickedCountry, setClickedCountry] = useState("")
    var mapUrl = `https://www.google.com/maps/place/${clickedCountry}/`


    useEffect(() => {
        axios.get(url + "track/" + id)
            .then((result) => {
                if (result.status === 400) {
                    alert("Invalid tracking code")
                    //TODO: navigate("/")
                }
                else {
                    setShipment(result.data)
                }
            }).catch((err) => {
                console.log(err);
                alert("Server Error")
                //TODO: navigate("/")
            });
    }, [])

    const trackinglocation = useRef()
    function openMap() {
        setClickedCountry(trackinglocation.current.innerHTML)
        setMapIsShowing(true)
        console.log(clickedCountry);
        window.open(
            mapUrl,
            "Name the window here",
            "width=500,height=500,screenX=500,screenY=500",
        )
    }

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
                            <p>Quantity</p>
                            <p>Content</p>
                            <p>Weight(Kg)</p>
                            {
                                shipment.shipingContent.map(shipingItem => {
                                    return (
                                        <>
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
                                    return (
                                        <>
                                            <h1 key={1}>{trackingItem.datetime}</h1>
                                            <h1 key={2}>{trackingItem.activity}</h1>
                                            <h1 className='underlined' onClick={openMap} ref={trackinglocation} key={3}>{trackingItem.location}</h1>
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
                            <h1>Sussex Freight Carrier: E132DF</h1>

                            <p>Type of Vessel</p>
                            <h1>Freight Carrier</h1>

                            <p>Type of Delivery</p>
                            <h1>Door-Delivery</h1>

                            <p>Status</p>
                            <h1>On Transit...</h1>

                            <p>Agent Name</p>
                            <h1>Micheal Johannes</h1>

                            <p>Comments</p>


                            <h1></h1>
                        </div>
                    </div>
                </div>
                {/* <div className={mapIsShowing ? 'secondchild' : 'invisible'}>
                    <div className="cancelButton" onClick={() => { setMapIsShowing(false) }}></div>
                    <div className="center">
                        <iframe src={mapUrl} frameBorder="0"></iframe>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default PackageDetails
