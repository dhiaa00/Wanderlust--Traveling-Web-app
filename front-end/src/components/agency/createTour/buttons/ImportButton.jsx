import React, { useRef } from "react";
import "./importButton.css";

const ImportButton = ({ text, type = "image" }) => {
  const ImageFileInput = useRef(null);

  const handleClickImageInput = () => {
    ImageFileInput.current.click();
  };
  return (
    <div className="post-import-image-container">
      <div className="post-import-image" onClick={handleClickImageInput}>
        <input
          type="file"
          accept={type === "image" ? "image/*" : "video/mp4, video/mov"}
          ref={ImageFileInput}
        />
        <span>{text}</span>
      </div>
    </div>
  );
};

export default ImportButton;
