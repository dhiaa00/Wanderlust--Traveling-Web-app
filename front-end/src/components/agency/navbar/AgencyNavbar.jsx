import "./agencyNavbar.css";
import React, { useState } from "react";
import MenuIcon from "../../../SVGs/menu icon.svg";
import HelpIcon from "../../../SVGs/help.svg";

const AgencyNavbar = () => {
  const [displayMenu] = useState(false);
  return (
    <div className="agency-navbar-container">
      <div className="agency-navbar">
        <div className="agency-navbar__logo"></div>
        <div className="agency-navbar__links">
          <p>Menu</p>
          {displayMenu ? (
            <div className="agency-navbar__menu">
              {/* waiting for design */}
            </div>
          ) : (
            // svg element for the menu icon
            <img src={MenuIcon}></img>
          )}
        </div>
        {/* help icon */}
        <img src={HelpIcon}></img>
      </div>
    </div>
  );
};

export default AgencyNavbar;
