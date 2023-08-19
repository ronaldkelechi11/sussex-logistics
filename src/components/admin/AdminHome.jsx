import { useState } from 'react'
import '../../styles/Admin.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminHome() {
    const url = import.meta.env.VITE_BACKEND_URL + "admin/add"
    const navigate = useNavigate()

    const [trackingCode, setTrackingCode] = useState("Tracking Code")
    const [receiverName, setReceiverName] = useState("")
    const [receiverAddress, setReceiverAddress] = useState("")
    const [receiverEmailAddress, setReceiverEmailAddress] = useState("")
    const [originCountry, setOriginCountry] = useState("")
    const [destinationCountry, setDestinationCountry] = useState("")
    const [shipingDate, setShipingDate] = useState("")
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("")
    const [paymentmode, setPaymentMode] = useState("transfer")
    const [typeOfShipment, setTypeOfShipment] = useState("")



    // For Shiping content
    const [shipingContentArray, setShipingContentArray] = useState([])
    const [quantity, setQuantity] = useState("")
    const [content, setContent] = useState("")
    const [weight, setWeight] = useState("")
    async function addToArray() {
        await setShipingContentArray(prevArray => {
            return [...prevArray, { quantity: quantity, content: content, weight: `${weight}Kg` }]
        })
        setQuantity("")
        setContent("")
        setWeight("")
    }


    // For Tracking Content
    const [shipingTrackingArray, setShipingTrackingArray] = useState([])
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [activity, setActivity] = useState("")
    const [location, setLocation] = useState("")
    async function addToTrackingArray() {
        var dt = date + " " + time
        await setShipingTrackingArray(prevArray => {
            return [...prevArray, { dt: dt, activity: activity, location: location }]
        })
        setDate("")
        setTime("")
        setActivity("")
        setLocation("")
    }



    function generatetrackingcode() {
        setTrackingCode(Date.now())
    }

    function finish() {
        if (trackingCode == "Tracking Code") {
            alert("Tracking code cannot be blank. Please generate a tracking code")
            return false;
        }
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
            "shipingContent": shipingContentArray,
            "shipingTracking": shipingTrackingArray
        }
        axios.post(url, { myObject: myObject })
            .then((result) => {
                // Succesful
                if (result.status == 200) {
                    alert("New package Added Succesfully with tracking code " + trackingCode)
                }
                else {
                    alert("Error saving Package to main Database")
                }
            }).catch((err) => {
                alert("Error please make sure all fields are filled")
                console.log(err);
            });
        console.log(myObject);
    }

    function goToEdit() {
        navigate("/admin/edit")
    }

    return (
        <div className="adminAddDetails">
            <div className="header">Add a Package</div>
            <div className="uid">{trackingCode} <button onClick={generatetrackingcode}>Generate a Tracking Code</button></div>
            <form>
                <input type="text" placeholder='Receiver Name' value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
                <input type="address" placeholder='Receiver Address' value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)} />
                <input type="email" placeholder='Receiver Email Address' value={receiverEmailAddress} onChange={(e) => setReceiverEmailAddress(e.target.value)} />
                <input type="text" placeholder='Type of Shipment' value={typeOfShipment} onChange={(e) => setTypeOfShipment(e.target.value)} />
                <h1>Shiping Date:</h1>
                <h1>Expected Delivery Date:</h1>
                <input type="date" value={shipingDate} onChange={(e) => setShipingDate(e.target.value)} placeholder='Shiping Date(yyyy/mm/dd)' />
                <input type="date" value={expectedDeliveryDate} onChange={(e) => setExpectedDeliveryDate(e.target.value)} placeholder='Expected Delivery Date(yyyy/mm/dd)' />
                <input type="text" placeholder='Origin Country' value={originCountry} onChange={(e) => setOriginCountry(e.target.value)} />
                <input type="text" placeholder='Destination Country' value={destinationCountry} onChange={(e) => setDestinationCountry(e.target.value)} />
            </form>


            <div className="shipingContentEditor">
                <div className="grid">
                    <p>No.</p>
                    <p>Quantity</p>
                    <p>Content</p>
                    <p>Weight(Kg)</p>
                    {shipingContentArray.map(shipingItem => {
                        return (
                            <>
                                <h1>{shipingContentArray.indexOf(shipingItem) + 1}</h1>
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
                        <input type="text" placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} />
                        <input type="number" placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        <input type="number" placeholder='Weight(KG)' value={weight} onChange={(e) => setWeight(e.target.value)} />
                        <input type="button" value="Add" onClick={addToArray} />
                    </div>
                </div>
            </div>


            <div className="shipmentTrackingEditor">
                <div className="grid">
                    <p>Date/Time</p>
                    <p>Activity</p>
                    <p>Location</p>
                    {shipingTrackingArray.map(shipingItem => {
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
            <div className="finish" onClick={finish}>Finish</div>
            <div className="goToEdit" onClick={goToEdit}>Edit a Package {'>>'}</div>
        </div>
    )
}

export default AdminHome
