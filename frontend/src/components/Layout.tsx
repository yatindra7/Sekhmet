import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
    return(
        <div className="layout-main">
            <Sidebar />
            <div className="layout-sub">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;