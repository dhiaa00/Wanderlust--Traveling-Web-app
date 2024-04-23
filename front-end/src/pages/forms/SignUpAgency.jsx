import React, { useState } from "react";
import agency from "../../images/signUpAgency.png";
import InputField from "../../components/Sign/InputField";
import MainButton from "../../components/buttons/MainButton";
import "./signupagency.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpAgency = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    agencyName: "",
    email: "",
    phoneNumber: "",
    location: "",
    registrationNumber: "",
    website: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/agency/register",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data.message);
      navigate(`/signup/confirmation/${response.data.confirmationId}`);
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
                title="Agency Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
              <InputField
                title="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <MainButton text="Create" onClickFunc={handleSubmit} />
              <p>
                Already Have An Account? <a href="">Log in</a>
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
                title="Agency Website"
                name="website"
                value={formData.website}
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
