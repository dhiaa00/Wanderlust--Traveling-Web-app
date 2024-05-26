import React, { useState } from "react";
import agency from "../../images/signUpAgency.svg";
import InputField from "../../components/Sign/InputField";
import MainButton from "../../components/buttons/MainButton";
import "./signupagency.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpAgency = () => {
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const [formData, setFormData] = useState({
    agencyName: "",
    email: "",
    phoneNumber: "",
    location: "",
    registrationNumber: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://wanderlust-backend-server.onrender.com/auth/agency/register",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data.message);
      navigate(`/signup/confirmation/agency/${response.data.confirmationId}`);
    } catch (error) {
      console.error("Error sending signup data:", error.response.data.message);
    }
  };

  return (
    <>
      <div className="bg-image-container"></div>
      <div className="sign-up-agency">
        <div className="section-info">
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="left-part">
              <InputField
                title="Agency Name"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleInputChange}
              />
              <InputField
                title="Email Adresse"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <InputField
                title="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <InputField
                title="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <InputField
                title="password"
                name="confirmPassword"
                value={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                onChange={handleChangeConfirmPassword}
              />
              <MainButton text="Create" onClickFunc={handleSubmit} />
              <p>
                Already Have An Account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <div className="left-part">
              <InputField
                title="Agency Registration Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
              />
              <InputField
                title="Agency Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
        <img src={agency} alt="tourist" />
      </div>
    </>
  );
};

export default SignUpAgency;
