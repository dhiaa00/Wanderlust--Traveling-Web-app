import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleResponse } from "../../services/handleGoogleResponse";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const navigate = useNavigate();
  return (
    <div>
      <GoogleLogin
        onSuccess={(response) => handleGoogleResponse(response, navigate)}
        onFailure={(response) => handleGoogleResponse(response, navigate)}
      />
    </div>
  );
};

export default GoogleAuth;
