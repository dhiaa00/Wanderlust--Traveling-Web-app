import React from "react";
import logo from "../../images/logo.png";
import SignLog from "../buttons/SignLogBtn";
import { Link } from "react-router-dom";
import "./navbar.css";
import MainButton from "../buttons/MainButton";

const NavBar = () => {
  return (
    <div className="navbar">
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <MainButton text="Sign Up" />
    </div>
  );
};

export default NavBar;
