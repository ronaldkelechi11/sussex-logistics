import { useState } from 'react'
import BackButton from "../BackButton";
import '../admin/AdminEdit.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminEdit = () => {
    const url = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()


    const [trackingCode, setTrackingCode] = useState("")
    const [receiverName, setReceiverName] = useState("")
    const [receiverAddress, setReceiverAddress] = useState("")
    const [receiverEmailAddress, setReceiverEmailAddress] = useState("")
    const [originCountry, setOriginCountry] = useState("")
    const [destinationCountry, setDestinationCountry] = useState("")
    const [shipingDate, setShipingDate] = useState("")
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("")
    const [paymentmode, setPaymentMode] = useState("transfer")
    const [typeOfShipment, setTypeOfShipment] = useState("")
    const [shipingContent, setShipingContent] = useState([])
    const [shipingTracking, setShipingTracking] = useState([])

    function findTrackingCode() {
        if (trackingCode == null) {
            alert("Tracking Code cannot be blank")
        }
        else {
            axios.post(url + "admin/edit", { trackingCode: trackingCode })
                .then((result) => {
                    if (result.status == 200) {
                        setReceiverName(result.data.receiverName)
                        setReceiverAddress(result.data.receiverAddress)
                        setReceiverEmailAddress(result.data.receiverEmailAddress)
                        setOriginCountry(result.data.originCountry)
                        setDestinationCountry(result.data.destinationCountry)
                        setShipingDate(result.data.shipingDate)
                        setTypeOfShipment(result.data.typeOfShipment)
                        setExpectedDeliveryDate(result.data.expectedDeliveryDate)
                        setPaymentMode(result.data.paymentMode)
                        setShipingContent(result.data.shipingContent)
                        setShipingTracking(result.data.shipingTracking)
                        console.log(shipingTracking);
                    }
                    if (result.status == 404) {
                        alert("Tracking Code doesn't belong to any package")
                    }
                }).catch((err) => {
                    console.log(err);
                    alert("Server Error Contact support on +2347044000087")
                });
        }
    }

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [activity, setActivity] = useState("")
    const [location, setLocation] = useState("")
    async function addToTrackingArray() {
        var dt = date + " " + time
        await setShipingTracking(prevArray => {
            return [...prevArray, { datetime: dt, activity: activity, location: location }]
        })
        setDate("")
        setTime("")
        setActivity("")
        setLocation("")
    }

    function updateTheList() {
        var myObject = {
            "id": trackingCode,
            "receiverName": receiverName,
            "receiverAddress": receiverAddress,
            "receiverEmailAddress": receiverEmailAddress,
            "originCountry": originCountry,
            "destinationCountry": destinationCountry,
            "shipingDate": shipingDate,
            "typeOfShipment": typeOfShipment,
            "expectedDeliveryDate": expectedDeliveryDate,
            "paymentMode": paymentmode,
            "shipingContent": shipingContent,
            "shipingTracking": shipingTracking
        }
        axios.put(url + "admin/edit", { myObject: myObject, id: trackingCode })
            .then((result) => {
                if (result.status == 200) {
                    alert('Package Succesfully updated')
                    navigate("/")
                }
                else {
                    alert("Error Updating Package contact Developer on +2347044000087")
                }
            }).catch((err) => {
                alert("Error Updating Package contact Developer on +2347044000087")
                console.log(err);
            });
    }

    return (
        <>
            <BackButton />
            <div className="adminEdit">
                <div className="overlay">
                    <div className="header">Edit a Package</div>
                    <div className="searchBar">
                        <input type="text" placeholder='Tracking Code' value={trackingCode} onChange={(e) => setTrackingCode(e.target.value)} />
                        <button onClick={findTrackingCode}>Search</button>
                    </div>

                    <div className="grid">
                        <p>Shiping Date: <span>{shipingDate}</span></p>
                        <p>Expected Delivery Date: <span>{expectedDeliveryDate}</span></p>
                        <p>Destination: <span> {destinationCountry}</span></p>
                        <p>Origin: <span>{originCountry}</span></p>
                        <p>Receiver Name: <span> {receiverName}</span></p>
                        <p>Receiver Address: <span> {receiverAddress}</span></p>
                        <p>Receiver Email Address: <span>{receiverEmailAddress}</span></p>
                        <p>Type of Shipment: <span>{typeOfShipment}</span></p>
                    </div>



                    <div className="shipingContent">
                        <div className="grid">
                            <p>NO</p>
                            <p>QTY</p>
                            <p>Content</p>
                            <p>Weight(Kg)</p>
                            {shipingContent.map(shipingItem => {
                                return (
                                    <>
                                        <h1>{shipingContent.indexOf(shipingItem) + 1}</h1>
                                        <h1>{shipingItem.quantity}</h1>
                                        <h1>{shipingItem.content}</h1>
                                        <h1>{shipingItem.weight}</h1>
                                    </>
                                )
                            })
                            }
                        </div>
                        <div className="add">
                            <div className="form">
                            </div>
                        </div>
                    </div>

                    <div className="shipingTracking">
                        <div className="grid">
                            <p>Date</p>
                            <p>Activity</p>
                            <p>Location</p>
                            {shipingTracking.map(shipingItem => {
                                return (
                                    <>
                                        <h1>{shipingItem.datetime}</h1>
                                        <h1>{shipingItem.activity}</h1>
                                        <h1>{shipingItem.location}</h1>
                                    </>
                                )
                            })
                            }
                        </div>
                        <div className="add">
                            <div className="form">
                                <input type='date' placeholder='Date Time(yyyy/dd/mm hh:mm)' value={date} onChange={(e) => setDate(e.target.value)} />
                                <input type='time' placeholder='Date Time(yyyy/dd/mm hh:mm)' value={time} onChange={(e) => setTime(e.target.value)} />
                                <input type="text" placeholder='Activity' value={activity} onChange={(e) => setActivity(e.target.value)} />
                                <input type="text" placeholder='Location(State, Country)' value={location} onChange={(e) => setLocation(e.target.value)} />
                                <input type="button" value="Add" onClick={addToTrackingArray} />
                            </div>
                        </div>
                    </div>

                    <div className="finish" onClick={updateTheList}>Done</div>
                </div>
            </div >
        </>
    )
}

export default AdminEdit
