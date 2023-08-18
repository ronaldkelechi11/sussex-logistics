import { useState } from 'react'
import BackButton from "../BackButton";
import '../admin/AdminEdit.scss'
import axios from 'axios';

const AdminEdit = () => {
    const url = import.meta.env.VITE_BACKEND_URL

    const [trackingCode, setTrackingCode] = useState()

    const [shipingDate, setShipingDate] = useState("")
    const [expectedShipingDate, setExpectedShipingDate] = useState("")
    const [destination, setDestination] = useState("")
    const [origin, setOrigin] = useState("")
    const [receiverName, setReceiverName] = useState("")
    const [receiverAddress, setReceiverAddress] = useState("")
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
                        setShipingDate(result.data.shipmentDate)
                        setExpectedShipingDate(result.data.expectedDeliveryDate)
                        setDestination(result.data.to)
                        setOrigin(result.data.from)
                        setReceiverName(result.data.owner)
                        setReceiverAddress(result.data.address)
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
            return [...prevArray, { dt: dt, activity: activity, location: location }]
        })
        setDate("")
        setTime("")
        setActivity("")
        setLocation("")
    }

    function updateTheList() {
        var myObject = {
            "id": trackingCode,
            "owner": receiverName,
            "from": origin,
            "to": destination,
            "address": receiverAddress,
            "shipmentDate": shipingDate,
            "expectedDeliveryDate": expectedShipingDate,
            "shipingContent": shipingContent,
            "shipingTracking": shipingTracking
        }
        axios.put(url + "admin/edit", { myObject: myObject, id: trackingCode })
            .then((result) => {
                if (result.status == 200) {
                    alert('Package Succesfully updated')
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
                        <p>Expected Delivery Date: <span>{expectedShipingDate}</span></p>
                        <p>Destination: <span> {destination}</span></p>
                        <p>Origin: <span>{origin}</span></p>
                        <p>Receiver Name: <span> {receiverName}</span></p>
                        <p>Receiver Address: <span> {receiverAddress}</span></p>
                    </div>



                    <div className="shipingContent">
                        <div className="grid">
                            <p>NO</p>
                            <p>QTY</p>
                            <p>Content</p>
                            {shipingContent.map(shipingItem => {
                                return (
                                    <>
                                        <h1>{shipingContent.indexOf(shipingItem) + 1}</h1>
                                        <h1>{shipingItem.quantity}</h1>
                                        <h1>{shipingItem.content}</h1>
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
                                        <h1>{shipingItem.dt}</h1>
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
