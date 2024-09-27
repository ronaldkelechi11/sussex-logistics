import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Landing = () => {
    const navigate = useNavigate()
    const [uniqueid, setUniqueId] = useState("")
    function goToTrack() {
        if (uniqueid.toString().length < 12) {
            alert("Unique ID for tracking cannot be blank")
            return false
        }
        if (uniqueid.toString().length >= 16) {
            alert("Please use a valid Tracking code")
            return false
        }
        else {
            navigate("/track/" + uniqueid)
            sessionStorage.setItem("uniqueid", uniqueid);
        }
    }


    return (
        <div className="h-[110vh] bg-heroImg bg-center bg-cover">
            <div className="w-full h-full bg-[#00000082] flex flex-col justify-center items-center">
                <h1 className="border-none text-white md:text-5xl text-3xl font-poppins">Track Your Shipment </h1>

                <div className="flex flex-row bg-white p-1 rounded-[10px]">
                    <input type="text" value={uniqueid} placeholder='Tracking Code(s)' onChange={(e) => { setUniqueId(e.target.value) }}
                        className="w-52 md:w-[400px] font-poppins p-3" />

                    <button className="bg-primary text-white p-3 rounded-[0px_10px_10px_0px]" onClick={goToTrack}>Track</button>
                </div>
            </div>
        </div>
    )
}

export default Landing
