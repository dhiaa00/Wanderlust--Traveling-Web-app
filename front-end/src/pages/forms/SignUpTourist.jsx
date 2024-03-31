import React from "react";
import tourist from "../../images/signUpTourist.png";
import InputField from "../../components/Sign/InputField";
import MainButton from "../../components/buttons/MainButton";
import GoogleAuth from "../../components/Sign/GoogleAuth";
import "./signuptourist.css";

const SignUpTourist = () => {
  return (
    <div className="sign-up-tourist">
      <div className="section-info">
        <h1>Create Account</h1>
        <GoogleAuth text="Sign Up With Google" />
        <div className="or">Or</div>
        <form action="Post">
          <InputField title="Full Name" />
          <InputField title="Email Adresse" />
          <InputField title="Password" />
          <MainButton text="Create" />
          <p>
            Already Have An Account? <a href="">Log in</a>
          </p>
        </form>
      </div>
      <div className="section">
        <img src={tourist} alt="tourist" />
      </div>
    </div>
  );
};

export default SignUpTourist;
