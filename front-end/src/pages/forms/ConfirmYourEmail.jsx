import React, { useState } from "react";
import "./confirmEmail.css";
import confirmationIcon from "/src/images/confirmation.svg";
import MainButton from "../../components/buttons/MainButton";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationCode from "./ConfirmationCode";
import axios from "axios";
import { saveToLocalStorage } from "../../utils/localStorageOp";
import toast from "react-hot-toast";

const ConfirmYourEmail = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const confirmationId = window.location.pathname.split("/").pop();
  const typeList = window.location.pathname
    .replace(confirmationId, "")
    .split("/");
  const type = typeList[typeList.length - 2];
  const [formData, setFormData] = useState({
    verificationCode: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        type === "agency"
          ? `${backendUrl}/agency/verify/${confirmationId}`
          : `${backendUrl}/user/verify/${confirmationId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status == 200) {
        toast.success(response.data.message);
        console.log(response.data.data);
        saveToLocalStorage("user", response.data.data);
        type == "agency"
          ? navigate(`/agency/${response.data.data._id}`)
          : navigate(`/user/${response.data.data.id}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
            we have sent email to
            <span className="email-adresse">{` ${email} `}</span>
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
