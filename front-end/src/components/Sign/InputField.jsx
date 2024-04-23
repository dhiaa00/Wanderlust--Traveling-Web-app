import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Import eye icons
import "./inputfield.css";

const InputField = ({ title, name, value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="input-field-container">
      <input
        className={
          "special-input" +
          (title.toLowerCase() === "password" ? " password-input" : "")
        }
        type={
          title.toLowerCase() === "password"
            ? isPasswordVisible
              ? "text"
              : "password"
            : "text"
        }
        placeholder={title}
        name={name}
        value={value}
        onChange={onChange}
      />
      {title.toLowerCase() === "password" && (
        <button
          type="button"
          className="password-toggle-btn"
          onClick={handleToggleVisibility}>
          <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
        </button>
      )}
    </div>
  );
};

export default InputField;
