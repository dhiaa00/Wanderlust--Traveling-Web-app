import React from "react";
import PaymentPageSideBar from "../../../components/payment/PaymentPageSideBar";
import EditProfileInfo from "../../../components/payment/EditProfileInfo";
import "./agencyinfopage.css";

const ProfilePage = () => {
  return (
    <div className="payment-page-content">
      <PaymentPageSideBar />
      <div className="the-actual-content">
        <EditProfileInfo />
      </div>
    </div>
  );
};

export default ProfilePage;
