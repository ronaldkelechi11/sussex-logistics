import { useState } from 'react'
import '../../styles/Admin.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminFormBody() {
    const [adminEmail, setAdminEmail] = useState("")
    const [adminPassword, setAdminPassword] = useState()

    const navigate = useNavigate()
    const adminUrl = import.meta.env.VITE_BACKEND_URL + "admin"
    const LOCAL_STORAGE_ADMINISLOGGEDIN = "localstorageadminisloggedin";

    function logIn() {
        axios.post(adminUrl, { email: adminEmail, password: adminPassword })
            .then((result) => {
                console.log(result);
                if (result.status == 400) {
                    alert("Wrong Admin Email or Password. Try Again")
                }
                if (result.status == 200) {
                    localStorage.setItem(LOCAL_STORAGE_ADMINISLOGGEDIN, true)
                    navigate("/admin")
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='admin'>
            <div className="overlay">
                <div className="formBody">
                    <div className="header">Admin Login</div>
                    <div className="form">
                        <input type="emails" placeholder='Email' value={adminEmail} onChange={(e) => { setAdminEmail(e.target.value) }} />
                        <input type="password" placeholder='Password' value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                        <input type="button" value="Log In" onClick={logIn} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminFormBody
