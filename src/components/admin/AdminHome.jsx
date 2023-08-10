import { useState } from 'react'
import '../../styles/Admin.scss'

function AdminHome() {
    const [trackingCode, setTrackingCode] = useState("Tracking Code")
    const [shipingDate, setShipingDate] = useState("")
    const [expectedShipingDate, setExpectedShipingDate] = useState("")
    const [destination, setDestination] = useState("")
    const [origin, setOrigin] = useState("")
    const [receiverName, setReceiverName] = useState("")
    const [receiverAddress, setReceiverAddress] = useState("")

    const [myObject, setMyObject] = useState({})

    // For shiping content
    const [shipingContentArray, setShipingContentArray] = useState([])
    const [quantity, setQuantity] = useState("")
    const [content, setContent] = useState("")
    async function addToArray() {
        console.log(quantity + " " + content);
        await setShipingContentArray(prevArray => {
            return [...prevArray, { quantity: quantity, content: content }]
        })
        console.log(shipingContentArray);
        setQuantity("")
        setContent("")
    }

    function generatetrackingcode() {
        setTrackingCode(Date.now())
    }


    return (
        <div className="adminAddDetails">
            <div className="header">Add a Package</div>
            <div className="uid">{trackingCode} <button onClick={generatetrackingcode}>Generate a Tracking Code</button></div>
            <form>
                <h1>Shiping Date:</h1>
                <h1>Expected Delivery Date:</h1>
                <input type="date" value={shipingDate} onChange={(e) => setShipingDate(e.target.value)} placeholder='Shiping Date(yyyy/mm/dd)' />
                <input type="date" value={expectedShipingDate} onChange={(e) => setExpectedShipingDate(e.target.value)} placeholder='Expected Delivery Date(yyyy/mm/dd)' />
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder='Destination(State, Country)' />
                <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder='Origin(State, Country)' />
                <input type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} placeholder='Receiver Name' />
                <input type="text" value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)} placeholder='Receiver Address' />
            </form>
            <div className="shipingContentEditor">
                <div className="add">
                    <div className="form">
                        <input type="text" placeholder='Package Content' value={content} onChange={(e) => setContent(e.target.value)} />
                        <input type="number" placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        <input type="button" value="submit" onClick={addToArray} />
                    </div>
                </div>
                <div className="grid">
                    <p>NO</p>
                    <p>QTY</p>
                    <p>Content</p>
                    {shipingContentArray.map(shipingItem => {
                        return (
                            <>
                                <h1>{shipingContentArray.indexOf(shipingItem) + 1}</h1>
                                <h1>{shipingItem.quantity}</h1>
                                <h1>{shipingItem.content}</h1>
                            </>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminHome
