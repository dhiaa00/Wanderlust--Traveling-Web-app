import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleAuth = (props) => {
  const handleGoogleResponse = async (response) => {
    try {
      const res = await axios.post(
        "https://wanderlust-backend-server.onrender.com/auth/google",
        {
          token: response.tokenId,
        }
      );
      console.log("Google login response:", res);
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };
  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleResponse}
        onFailure={handleGoogleResponse}
      />
    </div>
  );
};

export default GoogleAuth;
