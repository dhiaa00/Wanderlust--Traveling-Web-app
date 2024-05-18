import "./agencyNavbar.css";
import React, { useState } from "react";
import MenuIcon from "../../../SVGs/menu icon.svg";
import HelpIcon from "../../../SVGs/help.svg";

const AgencyNavbar = ({
  profileImage = "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
}) => {
  const [displayMenu] = useState(false);
  return (
    <div className="agency-navbar-container">
      <div className="agency-navbar">
        <div className="logo-container">
          <img
            className="agency-navbar__logo"
            src={profileImage}
            alt="profile photo"
          />
        </div>
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
