import React from "react";
import "./mainbutton.css";

const MainButton = ({ text, onClickFunc }) => {
  return (
    <button onClick={onClickFunc} className="main-button">
      <p>{text}</p>
    </button>
  );
};

export default MainButton;
