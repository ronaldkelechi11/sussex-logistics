import { useState } from 'react'
import BackButton from "../BackButton";
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
            <div className="p-4 bg-[rgb(255,248,232)] min-h-screen">
                <div className="bg-white rounded-lg shadow-lg p-3">
                    <div className="text-2xl font-bold text-gray-800 mb-6 text-center font-poppins">Edit a Package</div>

                    <div className="mb-6 flex flex-col">
                        <input type="text" placeholder='Tracking Code' value={trackingCode} onChange={(e) => setTrackingCode(e.target.value)} className='text-lg text-gray-400 mb-2 text-center border rounded p-2 font-poppins outline-none' />

                        <button onClick={findTrackingCode} className='px-4 py-2 bg-green-500 self-center text-white rounded hover:bg-blue-600 transition'>Search</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <p className='font-bold'>Shiping Date: <span>{shipingDate}</span></p>
                        <p className='font-bold'>Expected Delivery Date: <span>{expectedDeliveryDate}</span></p>
                        <p className='font-bold'>Destination: <span> {destinationCountry}</span></p>
                        <p className='font-bold'>Origin: <span>{originCountry}</span></p>
                        <p className='font-bold'>Receiver Name: <span> {receiverName}</span></p>
                        <p className='font-bold'>Receiver Address: <span> {receiverAddress}</span></p>
                        <p className='font-bold'>Receiver Email Address: <span>{receiverEmailAddress}</span></p>
                        <p className='font-bold'>Type of Shipment: <span>{typeOfShipment}</span></p>
                    </div>



                    <div className="mt-8">
                        <div className="grid grid-cols-2 gap-4 text-center font-semibold text-gray-800 bg-indigo-50 p-4 rounded-md shadow">
                            <p>Content</p>
                            <p>Weight (Kg)</p>
                        </div>

                        <div className="text-center text-gray-700 mt-4">
                            {shipingContent.map((item, index) => (
                                <div key={index} className="grid grid-cols-2 gap-4">
                                    <p><strong> ({item.quantity})</strong> {item.content}</p>
                                    <p>{item.weight}</p>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Tracking Section */}
                    <div className="mt-8">
                        <div className="grid grid-cols-3 gap-4 text-center font-semibold text-gray-800 bg-indigo-50 p-4 rounded-md shadow">
                            <p>Time</p>
                            <p>Activity</p>
                            <p>Location</p>
                        </div>

                        <div className="text-center flex flex-col gap-3 text-gray-700 mt-4">
                            {shipingTracking.map((trackingItem, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4 ">
                                    <p>{trackingItem.datetime}</p>
                                    <p>{trackingItem.activity}</p>
                                    <p
                                        className="cursor-pointer hover:text-indigo-400">
                                        {trackingItem.location}
                                    </p>
                                </div>
                            ))}
                        </div>


                        <div className="mt-4 md:grid grid-cols-4 gap-4 flex flex-col font-poppins">
                            <input type='date' placeholder='Date Time(yyyy/dd/mm hh:mm)' value={date} onChange={(e) => setDate(e.target.value)}

                                className='p-2 border rounded text-gray-400 w-full' />

                            <input type='time' placeholder='Date Time(yyyy/dd/mm hh:mm)' value={time} onChange={(e) => setTime(e.target.value)}
                                className='p-2 border rounded text-gray-400 w-full' />

                            <input type="text" placeholder='Activity' value={activity} onChange={(e) => setActivity(e.target.value)}
                                className='p-2 border rounded text-gray-400 w-full' />

                            <input type="text" placeholder='Location(State, Country)' value={location} onChange={(e) => setLocation(e.target.value)}
                                className='p-2 border rounded text-gray-400 w-full' />
                        </div>

                        <div className="flex w-full justify-center items-center p-3">
                            <input type="button" value="Add" onClick={addToTrackingArray}
                                className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition w-full md:w-[200px]' />
                        </div>

                    </div>

                    <div className="mt-8 px-4 py-2 w-full bg-gray-500 text-white rounded hover:bg-primary transition text-center font-poppins" onClick={updateTheList}>Done</div>
                </div>
            </div >
        </>
    )
}

export default AdminEdit
