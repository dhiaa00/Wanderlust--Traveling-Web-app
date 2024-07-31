import React, { useCallback } from "react";
import google from "../../images/google.svg";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GoogleAuth = (props) => {
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    try {
      const res = await googleAuth(response);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error sending Google data:", error);
    }
  };

  const onFailure = (response) => {
    console.error("Error logging in with Google:", response);
  };
  return (
    // <a
    //   href="http://localhost:8080/auth/google"
    //   className="sign-google"
    //   onClick={() => {}}>
    //   <img src={google} alt="google" />
    //   <p>{props.text}</p>
    // </a>
    <>
      <GoogleLogin
        clientId="1048104835010-e4a7ovk8h269mnthnqb4hvfhla7v9k9u.apps.googleusercontent.com"
        buttonText="Sign up"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </>
  );
};

export default GoogleAuth;
