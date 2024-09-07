import "./agencyNavbar.css";
import React, { useEffect, useState } from "react";
import MenuIcon from "../../../SVGs/menu icon.svg";
import HelpIcon from "../../../SVGs/help.svg";
import axios from "axios";
import { Link } from "react-router-dom";

const AgencyNavbar = () => {
  const [displayMenu] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const getProfileImage = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/agency/profileImage/${
        window.location.pathname.split("/")[2]
      }`,
      {
        withCredentials: true,
      }
    );
    setProfileImage(response.data.profileImage);
  };

  useEffect(() => {
    getProfileImage();
  }, []);

  return (
    <div className="agency-navbar-container">
      <div className="agency-navbar">
        <div className="logo-container">
          {
            // if there is a profile image, display it, otherwise display the agency's initials
            profileImage !== "" ? (
              <img
                className="agency-navbar__logo"
                src={profileImage}
                alt="profile photo"
              />
            ) : (
              <img
                className="agency-navbar__logo"
                src="https://www.w3schools.com/w3images/avatar2.png"
                alt="profile photo"
              />
            )
          }
        </div>
        <div className="agency-navbar__links">
          <p>Home</p>
          <Link to="/">
            <img src={MenuIcon}></img>
          </Link>
        </div>
        {/* help icon */}
        <img src={HelpIcon}></img>
      </div>
    </div>
  );
};

export default AgencyNavbar;
