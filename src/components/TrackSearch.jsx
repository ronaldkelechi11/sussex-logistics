import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TrackSearch.css'
import BackButton from './BackButton'

const TrackSearch = () => {
    const [uniqueid, setUniqueId] = useState("")
    const navigate = useNavigate()


    function searchForPackage() {
        if (uniqueid.toString().length <= 12) {
            alert("Unique ID for tracking cannot be less than 12")
            return false
        }
        if (uniqueid.toString().length >= 14) {
            alert("Unique ID for tracking cannot be more than 14")
            return false
        }
        else {
            navigate("/track/id?" + uniqueid)
            localStorage.setItem("uniqueid", uniqueid);
        }
    }

    return (
        <div className="trackingPage">
            <BackButton />
            <div className="overlay">
                <div className="header">Track</div>
                <div className="body">During the transportation process of getting from Warehouse to your Destination, <br /> You can track your package all the way with a unique tracking code given to you to track your package. </div>
                <div className="trackBar">
                    <input type="text" value={uniqueid}
                        onChange={(e) => { setUniqueId(e.target.value) }} />
                    <button onClick={searchForPackage}>Track</button>
                </div>
            </div>
        </div>
    )
}

export default TrackSearch
