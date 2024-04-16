import React, { useRef, useState } from "react";
import "./confirmationCode.css";

const ConfirmationCode = () => {
  const [code, setCode] = useState("");
  const inputRefs = useRef([]); // Array to store refs for each input field

  const handleChange = (event, index) => {
    const newCode = event.target.value.slice(0, 1); // Limit to single digit
    setCode((prevCode) => prevCode.slice(0, index) + newCode);

    // Focus on next input if current input is full and not the last one
    if (newCode.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  return (
    <div className="confirmation-code">
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="number"
          maxLength={1}
          onChange={(e) => handleChange(e, index)}
          value={code.charAt(index) || ""} // Set value to specific character in code state
        />
      ))}
    </div>
  );
};

export default ConfirmationCode;
