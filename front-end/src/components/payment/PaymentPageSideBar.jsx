import React, { useState } from "react";
import menuIcon from "/src/SVGs/Edit-profile-menu-icon.svg";
import closeMenuIcon from "/src/SVGs/edit-profile-close-circle.svg";
import "./paymentpagesidebar.css";
import { useNavigate } from "react-router-dom";

const PaymentPageSideBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const agencyId = user._id;

  const activeElement = window.location.pathname.split("/").pop();

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleNavigate = (path) => {
    if (!user.agencyName) {
      navigate("/user/" + agencyId + "/" + path);
      return;
    }
    navigate("/agency/" + agencyId + "/settings/" + path);
  };
  return (
    <div className="payment-page-sider-bar">
      {toggle ? (
        <img
          className="edit-profile-menu-icon"
          src={menuIcon}
          alt="menu"
          onClick={handleToggle}
        />
      ) : (
        <>
          <div className="section-container">
            <div className="title-container">
              <img
                className="edit-profile-menu-icon"
                src={closeMenuIcon}
                alt="menu"
                onClick={handleToggle}
              />
            </div>
            <div className="categories-container">
              <p
                onClick={() => handleNavigate("info")}
                className={
                  "paymet-page-category " +
                  (activeElement == "info" ? "active" : "")
                }>
                <img
                  src="/src/SVGs/Vector (1).svg"
                  alt=""
                  className="payment-page-category-icon"
                />
                Edit Profile
              </p>
              <p
                onClick={() => handleNavigate("language")}
                className={
                  "paymet-page-category " +
                  (activeElement == "language" ? "active" : "")
                }>
                <img
                  src="/src/SVGs/Vector (2).svg"
                  alt=""
                  className="payment-page-category-icon"
                />
                Language
              </p>
              <p
                onClick={() => handleNavigate("notifications")}
                className={
                  "paymet-page-category " +
                  (activeElement == "notifications" ? "active" : "")
                }>
                <img
                  src="/src/SVGs/Vector (3).svg"
                  alt=""
                  className="payment-page-category-icon"
                />
                Notification
              </p>
            </div>
          </div>
          <div className="section-container">
            <div className="title-container">
              <p className="title">Secure</p>
            </div>
            <div className="categories-container">
              <p
                onClick={() => handleNavigate("payment")}
                className={
                  "paymet-page-category " +
                  (activeElement == "payment" ? "active" : "")
                }>
                <img
                  src="/src/SVGs/Vector (4).svg"
                  alt=""
                  className="payment-page-category-icon"
                />
                Payments
              </p>
            </div>
          </div>
          <div className="section-container">
            <div className="title-container">
              <p className="title">Secure</p>
            </div>
            <div className="categories-container">
              <p
                onClick={() => handleNavigate("changePassword")}
                className={
                  "paymet-page-category " +
                  (activeElement == "changePassword" ? "active" : "")
                }>
                <img
                  src="/src/SVGs/Group 330 (1).svg"
                  alt=""
                  className="payment-page-category-icon"
                />
                Password
              </p>
            </div>
          </div>
          <div className="section-container-Delete-account">
            <div className="this-bar-that-doesnotmakesense"></div>
            <p
              onClick={() => handleNavigate("deleteAccount")}
              className={
                "paymet-page-category " +
                (activeElement == "deleteAccount" ? "active" : "")
              }>
              <img
                src="/src/SVGs/Vector (6).svg"
                alt=""
                className="payment-page-category-icon"
              />
              Delete account
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentPageSideBar;
