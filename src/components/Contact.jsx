import { Link } from "react-router-dom"

const Contact = () => {

    return (
        <div className="md:h-[70vh] bg-black flex flex-col p-5" id='contact'>

            <div className="h-[90%] flex flex-col md:flex-row pb-3">
                <div className="md:w-[60%] flex flex-col md:grid p-3 gap-3 grid-cols-2">
                    <div className="flex flex-col w-full h-full gap-3 justify-end text-white">
                        <div className="bg-logoImg bg-center bg-contain h-[200px] w-[200px] rounded-full"></div>
                        <h3 className="text-2xl md:text-nowrap font-poppins">Sussex Logistics and Shipping</h3>
                    </div>
                    <div className="text-white"></div>

                    <div className="text-white flex flex-col gap-2">
                        <h4 className="text-xl font-bold">Email(s)</h4>
                        <h5 className="text-sm">billing4sussexlogistics@gmail.com</h5>
                        <h5 className="text-sm">sussexlogisticsservice@gmail.com</h5>
                    </div>

                    <div className="text-white flex flex-col gap-2">
                        <h4 className="text-xl font-bold">Phone Number(s)</h4>
                        <h5 className="text-sm">
                            +1 (224) 230-0187
                        </h5>
                        <h5 className="text-sm">
                            +1 (224) 230-0187
                        </h5>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-white font-extrabold">Follow Us on Social</p>
                        <div className="flex flex-row">
                            {/* TODO: FACEBOOK, INSTAGRAM, TWITTER, YOUTUBE */}
                        </div>
                    </div>
                </div>

                <div className="md:w-[40%] flex flex-col justify-evenly p-3">
                    <h1 className="border-none">Track your shipments, make deliveries fast and swift now.</h1>
                    <Link to="/track" className="bg-primary font-poppins text-white rounded-lg text-center  p-[20px_40px] hover:scale-110 transition-[0.5s] hover:animate-pulse">Track</Link>
                </div>


            </div>

            <div className="border-t-white border-t-2 border-solid">
                <div className="text-white font-poppins text-xl text-center">© 2002 SUSSEX LOGISTICS</div>
            </div>
        </div>
    )
}

export default Contact
