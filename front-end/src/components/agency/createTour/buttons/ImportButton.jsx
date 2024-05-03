import React, { useRef } from "react";
import "./importButton.css";
import axios from "axios";

const ImportButton = ({ text, name, type, handleInputChange }) => {
  const cloud_name = "djwcvewmf";
  const ImageFileInput = useRef(null);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    const urls = [];

    if (name === "otherImagesUrl") {
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
        formData.append("upload_preset", "e_travelling");

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
            formData
          );

          urls.push(response.data.secure_url); // Add the URL to the array
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
      handleInputChange(event, urls);
    } else {
      formData.append("file", files[0]);
      formData.append("upload_preset", "e_travelling");
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
          formData
        );

        urls.push(response.data.secure_url); // Add the URL to the array
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      handleInputChange(event, urls[0]);
    }
  };

  return (
    <div className="post-import-image-container">
      <div
        className="post-import-image"
        onClick={() => ImageFileInput.current.click()}>
        <input
          type="file"
          name={name}
          accept={type === "image" ? "image/*" : "video/mp4, video/mov"}
          ref={ImageFileInput}
          onChange={handleImageUpload}
          {...(name === "otherImagesUrl" ? { multiple: true } : {})}
        />
        <span>{text}</span>
      </div>
    </div>
  );
};

export default ImportButton;
