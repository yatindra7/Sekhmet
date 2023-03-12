/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */

import { NavLink, useNavigate } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import { RiAdminLine, RiHotelBedFill, RiLogoutBoxRLine, RiStethoscopeLine } from 'react-icons/ri';
import { useAuthContext } from '../hooks/useAuthContext';

function Sidebar() {
  const navigate = useNavigate();
  const { user, logoutHandler } = useAuthContext();

  return (
    <div className="sidebar">
      <img src="/logo.png" alt="sekhmet" onClick={() => navigate('/')} />
      <div className="link-list">
        <NavLink to="/">
          <BiHomeAlt size={30} />
        </NavLink>
        {user?.role === 'Doctor' && (
          <NavLink to="/doctor">
            <RiStethoscopeLine size={30} />
          </NavLink>
        )}
        {user?.role !== 'Admin' && (
          <NavLink to="/patient">
            <RiHotelBedFill size={30} />
          </NavLink>
        )}
        {user?.role === 'Admin' && (
          <NavLink to="/admin">
            <RiAdminLine size={30} />
          </NavLink>
        )}
      </div>
      <div className="logout">
        <RiLogoutBoxRLine size={30} onClick={() => logoutHandler()} />
      </div>
    </div>
  );
}

export default Sidebar;
