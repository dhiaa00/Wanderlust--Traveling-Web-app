import React from "react";
import logo from "../../images/logo.png";
import SignLog from "../buttons/SignLogBtn";
import "./navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="logo" />
      <SignLog text={"Log in"} />
    </div>
  );
};

export default NavBar;
