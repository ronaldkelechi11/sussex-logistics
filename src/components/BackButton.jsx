import { ArrowLeft } from "@iconsans/react/linear"
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate = useNavigate()

    function goBack() {
        navigate(-1)
    }
    return (
        <div className="cursor-pointer bg-primary w-[50px] h-[50px] fixed top-5 left-5 rounded-lg flex justify-center items-center hover:scale-110 transition-[0.5s]" onClick={goBack}>
            <ArrowLeft className="text-white text-2xl text-center" />
        </div>
    )
}

export default BackButton
