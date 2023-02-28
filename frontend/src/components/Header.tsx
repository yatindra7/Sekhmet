import { useAuthContext } from "../hooks/useAuthContext";
import { IoIosMedkit } from 'react-icons/io'

function Header() {

    const {user} = useAuthContext()

    if(!user) return null;

    return(
        <div className="header">
            <div className="title">Dashboard</div>
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