import { useAuthContext } from "../hooks/useAuthContext";
import { IoIosMedkit } from 'react-icons/io'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Header() {

    const {user} = useAuthContext()
    const location = useLocation()

    const [title, setTitle] = useState<string>('Home')

    useEffect(() => {
        setTitle(location.pathname.split("/")[1].toUpperCase() || "HOME")
    }, [location.pathname])

    if(!user) return null;

    return(
        <div className="header">
            <div className="title">{title}</div>
            <div className="profile">
                <div className="profile-img-wrapper">
                    <IoIosMedkit size={25} />
                </div>
                <div className="profile-creds">
                    <div className="title">{user.name}</div>
                    <div className="role">{user.role}</div>
                </div>
            </div>
        </div>
    )
}

export default Header;