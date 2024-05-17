import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import MainButton from "../buttons/MainButton";
import logo from "/src/SVGs/HomePage/Wanderlust-logo.svg";

const NavBar = () => {
  const navigate = useNavigate();
  const onClickFunc = () => {
    navigate("/signup");
  };
  return (
    <div className="navbar">
      <img src={logo} alt="logo" />
      <nav className="nav-links">
        <Link to="/">Travel</Link>
        <Link to="/agencies">Agencies</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <MainButton text="Sign Up" onClickFunc={onClickFunc} />
    </div>
  );
};

export default NavBar;
