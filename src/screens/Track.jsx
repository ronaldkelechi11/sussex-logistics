import Navbar from '../components/Navbar'
import '../styles/Track.scss'

const Track = () => {
    return (
        <div className="trackingPage">
            <Navbar />
            <div className="overlay">
                <div className="header">Track</div>
                <div className="body">During the transportation process of getting from Warehouse to your Destination, <br /> You can track your package all the way with a unique tracking code given to you to track your package. </div>
                <div className="trackBar">
                    <input type="text" placeholder='Tracking Code' />
                    <button>Track</button>
                </div>
            </div>
        </div>
    )
}

export default Track
