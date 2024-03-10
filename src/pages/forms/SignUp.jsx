import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Select from "../../components/Sign/Select";
import select1 from "../../images/select1.png";
import "./signup.css";

const SignUp = () => {
  return (
    <>
      <NavBar />
      <div className="sign-up">
        <h1>Sign Up To Your Account</h1>
        <p>
          <span>Lorem</span>, ipsum dolor sit amet consectetur adipisicing elit.
          Reiciendis excepturi illo porro laudantium. Laboriosam amet, ullam
          laborum cumque assumenda in hic, atque, incidunt nobis ipsa eos
          accusamus repellat. Labore, vitae?
        </p>
        <div className="sign-selection">
          <Select img={select1} title="Tourist" />
          <Select img={select1} title="Tourist" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
