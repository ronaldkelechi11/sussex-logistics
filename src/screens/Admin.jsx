import AdminFormBody from '../components/admin/adminFormBody'
import AdminEdit from '../components/admin/AdminHome'
import { useEffect, useRef, useState } from "react";
import BackButton from '../components/BackButton';

const Admin = () => {
    const SESSION_STORAGE_ADMINISLOGGEDIN = sessionStorage.getItem("sessionstorageadminisloggedin");

    return (
        <div className="admin">
            <BackButton />
            {SESSION_STORAGE_ADMINISLOGGEDIN && <AdminEdit />}
            {!SESSION_STORAGE_ADMINISLOGGEDIN && <AdminFormBody />}
        </div>
    )
}

export default Admin
