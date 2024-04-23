import React, { useState } from "react";
import "./confirmEmail.css";
import confirmationIcon from "/src/images/confirmation.svg";
import MainButton from "../../components/buttons/MainButton";
import { useNavigate } from "react-router-dom";
import ConfirmationCode from "./ConfirmationCode";
import axios from "axios";

const ConfirmYourEmail = ({ email }) => {
  const navigate = useNavigate();
  const confirmationId = window.location.pathname.split("/").pop();
  const [formData, setFormData] = useState({
    confirmationCode: "",
  });

  console.log(formData.confirmationCode);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/user/verify/${confirmationId}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.succes) {
        console.log(response.data.message);
        navigate("/homepage");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error sending signup data:", error);
    }
  };
  return (
    <div className="confirm-email-container">
      <div className="confirm-your-email">
        <img src={confirmationIcon} alt="" />
        <div className="confirmation-text">
          <h1>Confirm Your Email</h1>
          <p>
            we have sent email to <span className="email-adresse">{email}</span>
            to confirm the validity of your email adress.
          </p>
          <p>Enter the six numbers sent to your email !</p>
        </div>
        <ConfirmationCode formData={formData} setFormData={setFormData} />
        <MainButton text="Verify" onClickFunc={handleSubmit} />
        <div className="failed">
          <p>Didn't receive the email?</p>
          <button>
            <p>Resend</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmYourEmail;
