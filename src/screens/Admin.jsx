import AdminFormBody from '../components/admin/adminFormBody'
import AdminEdit from '../components/admin/AdminEdit'
import { useEffect, useRef, useState } from "react";
import BackButton from '../components/BackButton';

const Admin = () => {
    const LOCAL_STORAGE_ADMINISLOGGEDIN = localStorage.getItem("localstorageadminisloggedin");

    return (
        <div className="admin">
            <BackButton />
            {LOCAL_STORAGE_ADMINISLOGGEDIN && <AdminEdit />}
            {!LOCAL_STORAGE_ADMINISLOGGEDIN && <AdminFormBody />}
        </div>
    )
}

export default Admin
