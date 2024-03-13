import React from "react";
import google from "../../images/google.png";

const GoogleAuth = ({ text }) => {
  return (
    <div className="sign-google">
      <img src={google} alt="google" />
      <p>{text}</p>
    </div>
  );
};

export default GoogleAuth;
