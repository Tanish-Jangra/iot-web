import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const handleClickLogout = () => {
    // Clear all cookies
    // document.cookie.split(";").forEach((c) => {
    //   document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    // });

    setClick(!click)
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink  end className="nav-logo">
            Procom Smart Devices
          </NavLink> 
          
          <ul className={click ? "nav-menu active" : "nav-menu"}>           
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                end
                className="nav-links"
                onClick={handleClick}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/settings"
                end
                className="nav-links"
                onClick={handleClick}
              >
                Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/actions"
                end
                className="nav-links"
                onClick={handleClick}
              >
                Actions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/graphs"
                end
                className="nav-links"
                onClick={handleClick}
              >
                Graphs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/connect"
                end
                className="nav-links"
                onClick={handleClickLogout}
              >
                Reconnect
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className="nav-links"
                onClick={handleClickLogout}
              >
                Logout
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;