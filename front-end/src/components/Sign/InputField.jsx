import React from "react";
import "./inputfield.css";

const InputField = ({ title }) => {
  return <input className="special-input" type="text" placeholder={title} />;
};

export default InputField;
