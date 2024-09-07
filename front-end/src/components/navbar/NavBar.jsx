import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import MainButton from "../buttons/MainButton";
import logo from "/src/SVGs/HomePage/Wanderlust-logo.svg";
import settingsIcon from "/src/SVGs/settings-icon.svg";
import menuIcon from "/src/SVGs/menu.svg";
import closeMenuIcon from "/src/SVGs/close-menu.svg";
import Modal from "react-modal";
import axios from "axios";
import toast from "react-hot-toast";

const NavBar = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onClickFunc = () => {
    navigate("/login");
  };
  const path = window.location.pathname.split("/").pop();

  // check if users logged
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLogged(true);
    }
  }, []);

  // handling logout

  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility state

  const openLogoutModal = () => setIsModalOpen(true);
  const closeLogoutModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    try {
      await axios.get("/auth/logout");
      // clear cookies.authorization
      document.cookgie =
        "authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      toast.success("Logged out successfully");
      setLogged(false);
      if (path !== "/") {
        navigate("/");
      } else {
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error logging out");
      console.error("Error logging out:", error);
    }
  };

  const User = JSON.parse(localStorage.getItem("user"));

  const handleProfileClick = () => {
    setMenuOpened(false);
    setProfileClick(!profileClick);
  };

  // handle menu opening

  const handleMenuOpen = () => {
    setProfileClick(false);
    setMenuOpened(!menuOpened);
  };

  const menuStyle =
    menuOpened && window.innerWidth < 768
      ? { clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)" }
      : {};

  const profileStyle = profileClick
    ? { clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)" }
    : {};

  // close menu when location changes
  useEffect(() => {
    setMenuOpened(false);
    setProfileClick(false);
  }, [location]);

  return (
    <div className="navbar">
      <img
        className="navbar-logo"
        src={logo}
        alt="logo"
        onClick={() => navigate("/")}
      />
      <div className="space-taker"></div>
      <nav className="nav-links" style={menuStyle}>
        <Link to="/" className={path === "" ? "active-navlink" : ""}>
          Home
        </Link>
        <Link
          to="/travels"
          className={path === "travels" ? "active-navlink" : ""}>
          Travel
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
        <MainButton text="Log in" onClickFunc={onClickFunc} />
      ) : (
        <div className="log-out-container">
          <img
            src={User.profilePhoto ? User.profilePhoto : ""}
            alt="profile"
            onClick={handleProfileClick}
          />
          <LogoutModal
            isOpen={isModalOpen}
            onClose={closeLogoutModal}
            onLogout={handleLogout}
          />
        </div>
      )}
      {menuOpened ? (
        <img
          className="menu-icon-navbar"
          src={closeMenuIcon}
          alt="menu"
          onClick={handleMenuOpen}
        />
      ) : (
        <img
          className="menu-icon-navbar"
          src={menuIcon}
          alt="menu"
          onClick={handleMenuOpen}
        />
      )}
      {User && (
        <nav className="profile-links" style={profileStyle}>
          <Link
            to={
              User.agencyName
                ? `/agency/${User._id}/tours`
                : `/user/${User._id}/info`
            }
            className={path === `/user/${User._id}` ? "active-navlink" : ""}>
            Profile
          </Link>
          <Link
            to={
              User.agencyName
                ? `/agency/${User._id}/messages`
                : `/user/${User._id}/messages`
            }
            className={
              path === `/user/${User._id}/messages` ? "active-navlink" : ""
            }>
            Messages
          </Link>

          <Link
            to={
              User.agencyName
                ? `/agency/${User._id}/notifications`
                : `/user/${User._id}/notifications`
            }
            className={
              path === `/user/${User._id}/notifications` ? "active-navlink" : ""
            }>
            Notifications
          </Link>
          <button className="main-button" onClick={openLogoutModal}>
            <p>Log out</p>
          </button>
        </nav>
      )}
    </div>
  );
};

export default NavBar;

function LogoutModal({ isOpen, onClose, onLogout }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        },
      }}>
      <h2>Are you sure you want to logout?</h2>
      <button onClick={onClose}>Cancel</button>
      <button
        onClick={() => {
          onLogout();
          onClose();
        }}>
        Confirm Logout
      </button>
    </Modal>
  );
}
