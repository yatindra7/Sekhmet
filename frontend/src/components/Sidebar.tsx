import { NavLink, useNavigate } from "react-router-dom";
import { BiHomeAlt } from 'react-icons/bi'
import { RiAdminLine, RiHotelBedFill, RiLogoutBoxRLine, RiStethoscopeLine } from 'react-icons/ri'
import { useAuthContext } from "../hooks/useAuthContext";

function Sidebar() {

    let navigate = useNavigate();
    let { logoutHandler } = useAuthContext();

    return(
        <div className="sidebar">
            <img src="/src/assets/logo.png" alt="sekhmet" onClick={() => navigate("/")} />
            <div className="link-list">
                <NavLink to="/"><BiHomeAlt size={30} /></NavLink>
                <NavLink to="/doctor"><RiStethoscopeLine size={30} /></NavLink>
                <NavLink to="/patient"><RiHotelBedFill size={30} /></NavLink>
                <NavLink to="/admin"><RiAdminLine size={30} /></NavLink>
            </div>
            <div className="logout">
                <RiLogoutBoxRLine size={30} onClick={() => logoutHandler()} />
            </div>
        </div>
    )
}

export default Sidebar;