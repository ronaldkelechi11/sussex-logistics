import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from './BackButton'
import { motion } from 'framer-motion'

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
            sessionStorage.setItem("uniqueid", uniqueid);
        }
    }

    return (
        <div className="w-screen h-screen bg-[url('/assets/images/port_yard.jpg')] bg-center bg-no-repeat bg-cover flex justify-center items-center">

            <BackButton />

            <div className="bg-[#000000b3] w-full h-full p-3 gap-5 flex flex-col justify-center items-center">
                <motion.h1
                    initial={{ y: -1000, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', duration: 4 }}
                    className="border-none text-white md:text-5xl text-4xl font-poppins">
                    Track Your Shipment
                </motion.h1>

                <motion.div
                    initial={{ x: 1000, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', duration: 7 }}
                    className="flex flex-row bg-white p-[2px] rounded-[10px]">
                    <input type="text" value={uniqueid} placeholder='Tracking Code(s)' onChange={(e) => { setUniqueId(e.target.value) }}
                        className="w-52 md:w-[400px] font-poppins p-3" />

                    <button className="bg-primary text-white p-3 rounded-[0px_10px_10px_0px]"
                        onClick={searchForPackage}
                    >
                        Track
                    </button>
                </motion.div>

            </div>

        </div>
    )
}

export default TrackSearch
