import React, { useState } from "react";
import "./deleteAccount.css";
import "./editprofilepayment.css";
import PaymentPageSideBar from "../../../components/payment/PaymentPageSideBar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const DeleteAccount = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let currentLocation = window.location.pathname.split("/");
  currentLocation[currentLocation.length - 1] = "info";
  currentLocation = currentLocation.join("/");

  const [deleteClicked, setDeleteClicked] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const handleDeleteAccount = async () => {
    if (deleteConfirmation === "I want to delete my account") {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        user.agencyName
          ? await axios.delete(`${backendUrl}/agency/delete/${user._id}`, {
              withCredentials: true,
            })
          : await axios.delete(`${backendUrl}/user/delete/${user._id}`, {
              withCredentials: true,
            });
        localStorage.removeItem("user");
        toast.success("Account deleted successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } catch (error) {
        toast.error("Error deleting account");
        console.error("Error deleting account:", error);
      }
    } else {
      toast.error("Wrong confirmation");
    }
  };
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
                  <Link to={currentLocation} className="click-stuff-text">
                    you can do that here.
                  </Link>
                </li>
                <li>
                  Account deletion is final, There will be no way to restore
                  your account.
                </li>
              </ul>
            </div>
            <button
              className="button-deletion"
              onClick={() => setDeleteClicked(true)}>
              Delete my account
            </button>
          </div>
        </div>
        {deleteClicked && (
          <div className="delete-account-confirmation">
            <h2>Are you sure you want to delete your account?</h2>
            <div className="delete-account-buttons">
              <label htmlFor="deleteConfirmation">
                Enter <span>'I want to delete my account'</span>
              </label>
              <input
                name="deleteConfirmation"
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
              />
              <div className="deletion-buttons">
                <button
                  className="button-deletion"
                  onClick={handleDeleteAccount}>
                  Yes, I'm sure
                </button>
                <button
                  className="button-deletion"
                  onClick={() => setDeleteClicked(false)}>
                  No, I changed my mind
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAccount;
