import './Services.css'
import ContainerImage from "../assets/images/c01.jpg";
import GlobalDelivery from "../assets/images/c005.png";
import Logistics from "../assets/images/6-2.jpg";
import FreightForwarding from "../assets/images/c03.jpg";

const Services = () => {
    return (
        <div className="services" id='services'>
            <div className="header">Our Services</div>
            <div className="grid">
                <div className="container">
                    <img src={ContainerImage} loading='eager' alt="" />
                    <div className="title">
                        Packaging and Storage
                    </div>
                </div>
                <div className="container">
                    <img src={Logistics} alt="" />
                    <div className="title">
                        Logistics
                    </div>
                </div>
                <div className="container">
                    <img src={GlobalDelivery} loading='eager' alt="" />
                    <div className="title">
                        Global Delivery System
                    </div>
                </div>
                <div className="container">
                    <img src={FreightForwarding} loading='eager' alt="" />
                    <div className="title">
                        Freight Forwarding
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Services
