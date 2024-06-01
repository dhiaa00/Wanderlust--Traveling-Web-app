import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import MainButton from "../buttons/MainButton";
import logo from "/src/SVGs/HomePage/Wanderlust-logo.svg";
import settingsIcon from "/src/SVGs/settings-icon.svg";

const NavBar = () => {
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();
  const onClickFunc = () => {
    navigate("/signup");
  };
  const path = window.location.pathname.split("/").pop();

  // check if users logged
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLogged(true);
    }
  }, []);
  const Logout = () => {
    localStorage.removeItem("user");
    setLogged(false);
    navigate("/");
  };

  return (
    <div className="navbar">
      <img src={logo} alt="logo" onClick={() => navigate("/")} />
      <nav className="nav-links">
        <Link to="/" className={path === "" ? "active-navlink" : ""}>
          Travel
        </Link>
        <Link
          to="/agencies"
          className={path === "agencies" ? "active-navlink" : ""}>
          Agencies
        </Link>
        <Link to="/about" className={path === "about" ? "active-navlink" : ""}>
          About
        </Link>
        <Link
          to="/contact"
          className={path === "contact" ? "active-navlink" : ""}>
          Contact
        </Link>
      </nav>
      {!logged ? (
        <MainButton text="Sign Up" onClickFunc={onClickFunc} />
      ) : (
        <div className="log-out-container">
          <img src={settingsIcon} alt="settings" />
          <button className="main-button" onClick={Logout}>
            <p>Log out</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
