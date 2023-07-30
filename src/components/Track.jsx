import { useNavigate } from 'react-router-dom'
import './Track.css'
import { useState } from 'react'

const Track = () => {
    const navigate = useNavigate()
    const [uniqueid, setUniqueId] = useState("")
    function goToTrack() {
        alert(uniqueid)
    }
    return (
        <div className="track">
            <div className="overlay">
                <div className="header">Track</div>
                <div className="body">During the transportation process of getting from Warehouse to your Destination, <br /> You can track your package all the way with a unique tracking code given to you to track your package. </div>
                <div className="trackBar">
                    <input type="text" value={uniqueid} placeholder='Tracking Code' onChange={(e) => { setUniqueId(e.target.value) }} />
                    <button onClick={goToTrack}>Track</button>
                </div>
            </div>
        </div>
    )
}

export default Track
