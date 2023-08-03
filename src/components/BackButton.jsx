import './BackButton.css'
import backButton from "../assets/images/arrow-left.svg"
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate = useNavigate()

    function goBack() {
        navigate("/")
    }
    return (
        <div className="backButton" onClick={goBack}>
            <img src={backButton} alt="" />
        </div>
    )
}

export default BackButton
