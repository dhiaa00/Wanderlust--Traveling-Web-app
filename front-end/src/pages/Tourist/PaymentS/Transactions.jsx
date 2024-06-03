import React from "react";
import "./transactions.css";
import "./editprofilepayment.css";
import ElementComponent from "../../../components/payment/amineNew/ElementComponent";
import PaymentPageSideBar from "../../../components/payment/PaymentPageSideBar";

const Transactions = () => {
  return (
    <div className="payment-page-content">
      <PaymentPageSideBar />
      <div className="transactions-container">
        <h1>Transactions</h1>
        <div className="elements-container">
          <div className="settings-title-container">
            <h2>Date</h2>
            <h2>Description</h2>
            <h2>Amount</h2>
            <h2>Category</h2>
            <h2>Account</h2>
          </div>
          <div className="container-of-element">
            <ElementComponent />
            <ElementComponent />
            <ElementComponent />
            <ElementComponent />
            <ElementComponent />
            <ElementComponent />
            <ElementComponent />
            <ElementComponent />
            <ElementComponent />
            <ElementComponent />
            <ElementComponent />
            <ElementComponent />
            <ElementComponent />
            <ElementComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
