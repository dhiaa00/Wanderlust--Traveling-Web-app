import React from "react";
import logo from "../../images/logo.png";
import SignLog from "../buttons/SignLogBtn";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <SignLog text={"Log in"} />
    </div>
  );
};

export default NavBar;
