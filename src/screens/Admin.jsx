import { useState } from 'react'
import BackButton from '../components/BackButton'
import '../styles/Admin.scss'

const Admin = () => {
    const [adminEmail, setAdminEmail] = useState("")
    const [adminPassword, setAdminPassword] = useState("")
    const LOCAL_STORAGE_ADMINISLOGGEDIN = "localstorageadminisloggedin";

    /* I want to add a feature that makes it that if the admin 
    logs in a message is sent
    to his Email so that the actual owner knows*/

    var MyComponent = <></>
    if (LOCAL_STORAGE_ADMINISLOGGEDIN != true) {
        MyComponent = adminFormBody
    }
    else (
        MyComponent = adminAddDetails
    )

    function adminFormBody() {
        return (
            <div className="formBody">
                <div className="header">Admin Login</div>
                <form action="" method="post">
                    <input type="text" placeholder='Email' value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                </form>
            </div>
        )
    }

    function adminAddDetails() {
        return (
            <div className="adminAddDetails">

            </div>
        )
    }

    return (
        <div className="admin">
            <BackButton />
            <div className="overlay">
                <MyComponent />
            </div>
        </div>
    )
}

export default Admin
