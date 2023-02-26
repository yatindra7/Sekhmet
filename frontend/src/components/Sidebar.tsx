import { useNavigate } from "react-router-dom";

function Sidebar() {

    let navigate = useNavigate();

    return(
        <div className="sidebar">
            <img src="/src/assets/logo.png" alt="sekhmet" onClick={() => navigate("/")} />
        </div>
    )
}

export default Sidebar;