import React, { useState } from "react";
import menuIcon from "/src/SVGs/Edit-profile-menu-icon.svg";
import closeMenuIcon from "/src/SVGs/edit-profile-close-circle.svg";
import "./paymentpagesidebar.css";
import { useNavigate } from "react-router-dom";

const PaymentPageSideBar = () => {
  const navigate = useNavigate();
  const agencyId = JSON.parse(localStorage.getItem("user"))._id;

  const activeElement = window.location.pathname.split("/").pop();

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleNavigate = (path) => {
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
              <p className="title">Profile</p>
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
              <p className="paymet-page-category">
                <img
                  src="/src/SVGs/money.svg"
                  alt=""
                  className="payment-page-category-icon"
                />
                Taxes
              </p>
              <p className="paymet-page-category">
                <img
                  src="/src/SVGs/Layer 3.svg"
                  alt=""
                  className="payment-page-category-icon"
                />
                Transactions
              </p>
            </div>
          </div>
          <div className="section-container">
            <div className="title-container">
              <p className="title">Secure</p>
            </div>
            <div className="categories-container">
              <p className="paymet-page-category">
                <img
                  src="/src/SVGs/Group 330 (1).svg"
                  alt=""
                  className="payment-page-category-icon"
                />
                Password
              </p>
              <p className="paymet-page-category">
                <img
                  src="/src/SVGs/Vector (5).svg"
                  alt=""
                  className="payment-page-category-icon"
                />
                Access
              </p>
            </div>
          </div>
          <div className="section-container-Delete-account">
            <div className="this-bar-that-doesnotmakesense"></div>
            <p className="paymet-page-category">
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
