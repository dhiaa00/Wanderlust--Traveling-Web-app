import React from "react";
import "./deleteAccount.css";
import "./editprofilepayment.css";
import PaymentPageSideBar from "../../../components/payment/PaymentPageSideBar";

const DeleteAccount = () => {
  return (
    <div className="payment-page-content">
      <PaymentPageSideBar />
      <div className="delete-account-container">
        <h1>Delete Account</h1>

        <div className="delete-account-info-container">
          <h2>Before you go..</h2>
          <div className="stuff">
            <div className="list-of-stuff">
              <ul>
                <li>
                  If you are sick of getting emails notifications from us,{" "}
                  <span className="click-stuff-text">
                    you can disable them here.
                  </span>
                </li>
                <li>
                  If you want to change your username,{" "}
                  <span className="click-stuff-text">
                    you can do that here.
                  </span>
                </li>
                <li>
                  Account deletion is final, There will be no way to restore
                  your account.
                </li>
              </ul>
            </div>
            <button className="button-deletion">Delete my account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
