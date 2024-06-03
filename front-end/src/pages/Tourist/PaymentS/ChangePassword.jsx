import React from "react";
import "./changePassword.css";
import "./editprofilepayment.css";
import PaymentPageSideBar from "../../../components/payment/PaymentPageSideBar";

const ChangePassword = () => {
  return (
    <div className="payment-page-content">
      <PaymentPageSideBar />
      <div className="password-container">
        <h1>Password</h1>
        <div className="container-change-password">
          <p>Current Password</p>
          <p>New Password</p>
          <p>Confirm New Password</p>
        </div>
        <div className="buttons-container">
          <button className="cancel-button">Cancel</button>
          <button className="updatepassword">Update Password</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
