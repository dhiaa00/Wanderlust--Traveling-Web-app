import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import tourist from "../../images/signUpTourist.svg";
import InputField from "../../components/Sign/InputField";
import MainButton from "../../components/buttons/MainButton";
import GoogleAuth from "../../components/Sign/GoogleAuth";
import "./signuptourist.css";
import axios from "axios";

const SignUpTourist = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/auth/user/register`,
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message);
      navigate(`/signup/confirmation/user/${response.data.confirmationId}`, {
        state: { email: formData.email },
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error sending signup data:", error);
    }
  };

  return (
    <>
      <div className="bg-image-container"></div>
      <div className="sign-up-tourist">
        <div className="section-info">
          <h1>Create Account</h1>
          <GoogleAuth text="Sign Up With Google" />
          <div className="or">Or</div>
          <form onSubmit={handleSubmit}>
            <InputField
              title="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <InputField
              title="Email Adresse"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputField
              title="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <InputField
              title="Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <MainButton text="Create" onClickFunc={handleSubmit} />
            <p>
              Already Have An Account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
        <div className="section">
          <img src={tourist} alt="tourist" />
        </div>
      </div>
    </>
  );
};

export default SignUpTourist;
