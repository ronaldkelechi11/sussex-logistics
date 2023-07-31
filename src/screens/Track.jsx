import { useState } from 'react';
import Navbar from '../components/Navbar'
import '../styles/Track.scss'


const Track = () => {
    const [myComponent, setMyComponent] = useState(<TrackSearch />)
    function searchForPackage() {
        setMyComponent(<PackageDetails />)
        console.log("Changed");
    }

    function TrackSearch() {
        return (
            <div className="overlay">
                <div className="header">Track</div>
                <div className="body">During the transportation process of getting from Warehouse to your Destination, <br /> You can track your package all the way with a unique tracking code given to you to track your package. </div>
                <div className="trackBar">
                    <input type="text" placeholder='Tracking Code' />
                    <button onClick={searchForPackage}>Track</button>
                </div>
            </div>
        )
    }

    function PackageDetails() {
        return (
            <div className="packageDetails">

            </div>
        )
    }

    return (
        <div className="trackingPage">
            <Navbar />
            {myComponent}
        </div>
    )
}

export default Track
