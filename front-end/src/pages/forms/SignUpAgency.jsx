import React from "react";
import agency from "../../images/signUpAgency.png";
import InputField from "../../components/Sign/InputField";
import MainButton from "../../components/buttons/MainButton";
import "./signupagency.css";
import { useNavigate } from "react-router-dom";

const SignUpAgency = () => {
  const navigate = useNavigate();
  const onClickFunc = () => {
    navigate("/signup/confirmation/1");
  };
  return (
    <>
      <div className="bg-image-container"></div>
      <div className="sign-up-agency">
        <div className="section-info">
          <h1>Create Account</h1>
          <form action="Post">
            <div className="left-part">
              <InputField title="Agency Name" />
              <InputField title="Email Adresse" />
              <InputField title="Phone Number" />
              <InputField title="Agency Website" />
              <InputField title="Agency Location" />
              <MainButton text="Create" onClickFunc={onClickFunc} />
              <p>
                Already Have An Account? <a href="">Log in</a>
              </p>
            </div>
            <div className="left-part">
              <InputField title="Agency Registration Number" />
            </div>
          </form>
        </div>
        <img src={agency} alt="tourist" />
      </div>
    </>
  );
};

export default SignUpAgency;
