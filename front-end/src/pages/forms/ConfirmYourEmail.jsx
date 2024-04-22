import React from "react";
import "./confirmEmail.css";
import confirmationIcon from "/src/images/confirmation.svg";
import MainButton from "../../components/buttons/MainButton";
import { useNavigate } from "react-router-dom";
import ConfirmationCode from "./ConfirmationCode";

const ConfirmYourEmail = ({ email }) => {
  const navigate = useNavigate();
  const onClickFunc = () => {
    navigate("/agency/1/tours");
  };
  return (
    <div className="confirm-email-container">
      <div className="confirm-your-email">
        <img src={confirmationIcon} alt="" />
        <div className="confirmation-text">
          <h1>Confirm Your Email</h1>
          <p>
            we have sent email to <span className="email-adresse">{email}</span>{" "}
            to confirm the validity of your email adress.
          </p>
          <p>Enter the six numbers sent to your email !</p>
        </div>
        <ConfirmationCode />
        <MainButton text="Verify" onClickFunc={onClickFunc} />
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
