import React from "react";
import googleLogo from "/src/SVGs/googleLogo.svg";
import "./login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="sign-up-container">
        <h1>
          Log in to <span>Wanderlust</span>
        </h1>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <div className="keep-me-logged">
            <input type="checkbox" id="keep-me-logged" />
            <label htmlFor="keep-me-logged">Keep me logged in</label>
          </div>
          <button>Sign in</button>
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
