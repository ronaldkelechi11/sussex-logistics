import { useState } from 'react'
import '../../styles/Admin.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminFormBody() {
    const [adminEmail, setAdminEmail] = useState("")
    const [adminPassword, setAdminPassword] = useState()

    const navigate = useNavigate()
    const adminUrl = import.meta.env.VITE_BACKEND_URL + "admin"
    const SESSION_STORAGE_ADMINISLOGGEDIN = "sessionstorageadminisloggedin";

    function Login() {
        axios.post(adminUrl, {email: adminEmail, password: adminPassword})
            .then((result) => {
                if (result.status != 400) {
                    sessionStorage.setItem(SESSION_STORAGE_ADMINISLOGGEDIN, true)
                    navigate("/")
                }
            }).catch((err) => {
                console.log(err);
                alert("Server Error please contact the support developer")
            });
    }

    return (
        <div className="overlay">
            <div className="formBody">
                <div className="header">Admin Login</div>
                <div className="form">
                    <input type="emails" placeholder='Email' value={adminEmail} onChange={(e) => { setAdminEmail(e.target.value) }} />
                    <input type="password" placeholder='Password' value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                    <input type="button" value="Log In" onClick={Login} />
                </div>
            </div>
        </div>
    )
}

export default AdminFormBody
