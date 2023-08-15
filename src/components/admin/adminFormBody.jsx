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
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", adminEmail);
        urlencoded.append("password", adminPassword);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(adminUrl, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                if (result.status == 400) {
                    alert("Wrong Admin Email or Password. Try Again")
                }
                if (result.status == 200) {
                    sessionStorage.setItem(SESSION_STORAGE_ADMINISLOGGEDIN, true)
                    navigate("/")
                }
            })
            .catch(error => {
                alert("Error")
                console.log(error);
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
