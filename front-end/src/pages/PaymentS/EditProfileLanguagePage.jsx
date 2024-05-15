import React from "react";
import PaymentPageSideBar from "../../components/payment/PaymentPageSideBar";
import EditProfileLanguages from "../../components/payment/EditProfileLanguages";
import "./editprofilelanguagepage.css";

const EditProfileLanguagePage = () => {
  return (
    <div className="payment-page-content">
      <PaymentPageSideBar />
      <div className="the-actual-content-language">
        <EditProfileLanguages />
      </div>
    </div>
  );
};

export default EditProfileLanguagePage;
