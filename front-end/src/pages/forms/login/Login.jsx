import React, { useState } from "react";
import googleLogo from "/src/SVGs/googleLogo.svg";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveToLocalStorage } from "../../../utils/localStorageOp";
import toast from "react-hot-toast";

const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [accountType, setAccountType] = useState("agency");
  const handleAccountType = (e) => {
    setAccountType(e.target.value);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        accountType == "agency"
          ? `${backendUrl}/auth/agency/login`
          : `${backendUrl}/auth/user/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Login successful");
        saveToLocalStorage(
          accountType == "agency" ? "agency" : "user",
          response.data.data
        );
        if (accountType == "agency") {
          navigate(`/agency/${response.data.data._id}/tours`);
        }
        if (accountType == "user") {
          navigate(`/`);
        }
      } else {
        toast.error(response.data.message);
        console.log("Login failed");
      }
    } catch (err) {
      toast.error(err.response.data.message);
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
          <label htmlFor="accountType">Account Type</label>
          <select
            name="accountType"
            id="accountType"
            onChange={(e) => handleAccountType(e)}>
            <option value="agency">Agency</option>
            <option value="user">Tourist</option>
          </select>
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
