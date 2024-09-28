import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminFormBody() {
    const [adminEmail, setAdminEmail] = useState("")
    const [adminPassword, setAdminPassword] = useState()

    const navigate = useNavigate()
    const adminUrl = import.meta.env.VITE_BACKEND_URL + "admin"
    const SESSION_STORAGE_ADMINISLOGGEDIN = "sessionstorageadminisloggedin";

    function Login() {
        axios.post(adminUrl, { email: adminEmail, password: adminPassword })
            .then((result) => {
                console.log(result);
                if (result.status != 400) {
                    sessionStorage.setItem(SESSION_STORAGE_ADMINISLOGGEDIN, true)
                    navigate(0)
                }
            }).catch((err) => {
                console.log(err);
                alert("Server Error please contact the support developer")
            });
    }

    return (
        <div className="w-screen h-screen bg-[url('/assets/images/port_yard.jpg')] bg-center bg-cover bg-no-repeat flex justify-center items-center">
            <div className="bg-[#00000080] w-full h-full flex flex-col justify-center items-center">
                <img src="/assets/images/logo_transparent.PNG" className='h-32 w-32' alt="" />

                <div className="text-3xl text-white font-poppins mb-4">Login</div>

                <div className="flex flex-col gap-4">
                    <input type="emails" placeholder='Email' value={adminEmail} onChange={(e) => { setAdminEmail(e.target.value) }} className='input-style' />
                    <input type="password" placeholder='Password' value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className='input-style' />
                    <input type="button" value="Log In" onClick={Login} className='bg-primary p-[10px_30px] text-white font-poppins rounded-lg' />
                </div>
            </div>
        </div>
    )
}

export default AdminFormBody
