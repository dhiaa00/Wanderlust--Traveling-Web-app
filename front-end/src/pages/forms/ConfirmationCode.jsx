import React, { useRef, useState } from "react";
import "./confirmationCode.css";

const ConfirmationCode = ({ setFormData }) => {
  const [code, setCode] = useState("");
  const inputRefs = useRef([]); // Array to store refs for each input field

  const handleChange = (event, index) => {
    const newCode = event.target.value.slice(0, 1); // Limit to single digit
    const updatedCode = code.slice(0, index) + newCode + code.slice(index + 1);

    setCode(updatedCode);
    setFormData({ verificationCode: updatedCode });

    // Focus on next input if current input is full and not the last one
    if (newCode.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !code[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData("text").slice(0, 6); // Get pasted data and limit to 6 characters
    const updatedCode = pasteData.padEnd(6).slice(0, 6); // Pad the code to ensure it has 6 characters
    setCode(updatedCode);
    setFormData({ verificationCode: updatedCode });

    // Fill input fields and focus the last filled input
    updatedCode.split("").forEach((char, index) => {
      inputRefs.current[index].value = char;
      if (char && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    });
  };

  return (
    <div className="confirmation-code" onPaste={handlePaste}>
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength={1}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          value={code.charAt(index) || ""} // Set value to specific character in code state
        />
      ))}
    </div>
  );
};

export default ConfirmationCode;
