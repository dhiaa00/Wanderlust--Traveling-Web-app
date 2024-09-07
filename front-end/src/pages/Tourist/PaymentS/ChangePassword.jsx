import React, { useState } from "react";
import "./changePassword.css";
import "./editprofilepayment.css";
import PaymentPageSideBar from "../../../components/payment/PaymentPageSideBar";
import toast from "react-hot-toast";
import axios from "axios";

const ChangePassword = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      const response = await axios.put(
        `${backendUrl}/${user.agencyName ? "agency" : "user"}/update/password/${
          user._id
        }`,
        {
          currentPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Password updated successfully");
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="payment-page-content">
      <PaymentPageSideBar />
      <div className="password-container">
        <h1>Password</h1>
        <div className="container-change-password">
          <div className="change-password">
            <div className="password-container">
              <label htmlFor="current-password">Current Password</label>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="password-container">
              <label htmlFor="new-password">New Password</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="password-container">
              <label htmlFor="confirm-new-password">Confirm New Password</label>
              <input
                type="password"
                id="confirm-new-password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <button className="updatepassword" onClick={handleUpdatePassword}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
