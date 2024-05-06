import React, { useState } from "react";
import tourist from "../../images/signUpTourist.png";
import InputField from "../../components/Sign/InputField";
import MainButton from "../../components/buttons/MainButton";
import GoogleAuth from "../../components/Sign/GoogleAuth";
import "./signuptourist.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpTourist = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  console.log(formData);
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
        "http://localhost:8080/auth/user/register",
        formData,
        {
          withCredentials: true,
        }
      );

      navigate(`/signup/confirmation/user/${response.data.confirmationId}`);
    } catch (error) {
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
              value={formData.password}
              onChange={handleConfirmPasswordChange}
            />
            <MainButton text="Create" onClickFunc={handleSubmit} />
            <p>
              Already Have An Account? <a href="">Log in</a>
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
