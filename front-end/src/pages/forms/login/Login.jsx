import React, { useState } from "react";
import googleLogo from "/src/SVGs/googleLogo.svg";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveToLocalStorage } from "../../../utils/localStorageOp";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/agency/login",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        saveToLocalStorage("user", response.data.data);
        navigate(`/agency/${response.data.data._id}/tours`);
      } else {
        console.log("Login failed");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login-page">
      <div className="sign-up-container">
        <h1>
          Log in to <span>Wanderlust</span>
        </h1>
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => handleChange(e)}
          />
          <div className="keep-me-logged">
            <input type="checkbox" id="keep-me-logged" />
            <label htmlFor="keep-me-logged">Keep me logged in</label>
          </div>
          <button onClick={(e) => handleLogin(e)}>Sign in</button>
        </form>
        <div className="or">Or</div>
        <div className="google-auth">
          <button>
            <img src={googleLogo} alt="google" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
