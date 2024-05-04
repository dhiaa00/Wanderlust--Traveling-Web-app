import React from "react";
import logo from "../../images/logo.png";
import SignLog from "../buttons/SignLogBtn";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <SignLog text={"Log in"} />
    </div>
  );
};

export default NavBar;
