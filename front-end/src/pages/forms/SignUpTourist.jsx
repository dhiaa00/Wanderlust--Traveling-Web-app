import React from "react";
import tourist from "../../images/signUpTourist.png";
import InputField from "../../components/Sign/InputField";
import MainButton from "../../components/buttons/MainButton";
import GoogleAuth from "../../components/Sign/GoogleAuth";
import "./signuptourist.css";
import { useNavigate } from "react-router-dom";

const SignUpTourist = () => {
  const navigate = useNavigate();
  const onClickFunc = () => {
    navigate("signup/confirmation/1");
  };
  return (
    <>
      <div className="bg-image-container"></div>
      <div className="sign-up-tourist">
        <div className="section-info">
          <h1>Create Account</h1>
          <GoogleAuth text="Sign Up With Google" />
          <div className="or">Or</div>
          <form action="Post">
            <InputField title="Full Name" />
            <InputField title="Email Adresse" />
            <InputField title="Password" />
            <MainButton text="Create" onClickFunc={onClickFunc} />
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
