import GlobalDelivery from "/assets/images/c005.png";
import FreightForwarding from "/assets/images/1-3-2.jpg";
import WarehouseImage from "/assets/images/6-2.jpg";
import RailFreightImage from "/assets/images/rail_freight.jpg";
import ParcelsImage from "/assets/images/parcels.jpg";
import RoadFreightImage from "/assets/images/road haulage.jpg";

const Services = () => {
    return (
        <div className="w-full flex flex-col bg-white" id='services'>
            <div className="flex flex-col">
                <p className="text-4xl md:text-6xl text-primary font-poppins text-center">Our <span className="text-black">Services</span></p>
                <div className="md:text-lg text-sm p-2 text-[#909090] font-poppins text-center">We have been providing services to multiple international clients for more than 25 years consecutively and are ready to continue increasing our clientel.</div>
            </div>

            <div className="p-3 gap-5 flex flex-col md:grid grid-cols-3">
                <ServiceItem title={'Air Freight'} image={GlobalDelivery} description={'Sussex Logistics connects people in over 220 countries and territories worldwide. Driven by the power of more than 600,000 employees, we deliver integrated services and tailored solutions for managing and transporting letters, goods and information.'} />

                <ServiceItem title={'Ocean Freight'} image={FreightForwarding} description={'Streamline your global supply chain with our reliable ocean freight services. We offer customized shipping solutions, ensuring safe and timely delivery of your cargo across the world’s busiest ports. Trust us to navigate complex logistics, so you can focus on growing your business.'} />

                <ServiceItem title={'Road Freight'} image={RoadFreightImage} description={'Our road freight services provide fast, flexible, and efficient transportation for your goods across regional and national routes. With a dedicated fleet and expert drivers, we ensure timely deliveries, no matter the distance. Rely on us for secure and cost-effective ground logistics solutions tailored to your needs.'} />

                <ServiceItem title={'Rail Freight'} image={RailFreightImage} description={'Optimize your supply chain with our efficient railway freight services. We provide cost-effective, eco-friendly transport solutions for large volumes, ensuring timely deliveries across key national and international routes. Rely on our expertise to keep your business on track.'} />

                <ServiceItem title={'Document and Parcel'} image={ParcelsImage} description={'Sustainable business begins with sustainable supply chains. We proudly provide a comprehensive portfolio of emission reduced logistics solutions. Find out what we have to offer, why we’re committed to sustainability, and how our industry is helping deliver an even better world.'} />

                <ServiceItem title={'Warehouse Solutions'} image={WarehouseImage} description={'The warehouse solution you choose needs to be scalable and flexible to keep your supply chain running smoothly and accommodate fluctuations in demand. We provide the optimal mix of dedicated and shared resources to improve inventory efficiency and accelerate your response to changing customer demands.'} />
            </div>

        </div >
    )
}

function ServiceItem({ title, description, image }) {
    return (
        <div className="w-full rounded-lg bg-white min-h-[400px] shadow-lg flex flex-col">
            <img src={image} alt="" className="w-full max-h-[60%]" />
            <p className="text-3xl font-poppins text-center p-2">{title}</p>
            <p className="text-sm font-poppins text-center p-2">{description}</p>
        </div>
    )
}

export default Services
