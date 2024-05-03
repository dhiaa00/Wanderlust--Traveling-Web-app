import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ text, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploadState, setUploadState] = useState({
    uploading: false,
    error: null,
  });

  const CLOUDINARY_PRESET = {
    name: "Social-Media-Posts", // Replace with your desired preset name
    cloudName: "djwcvewmf", // Replace with your Cloudinary Cloud Name
    apiKey: "583915189455894", // Replace with your Cloudinary API Key
    resourceType: ["image", "video"],
    transformations: {
      image: {
        f_auto: true,
        q_auto: "best",
      },
      video: {
        c_fit: "1280x720",
        b_auto: true,
      },
    },
    // Define uploadFolder logic based on your needs (optional)
    // tags: ['social_media', `{year}`], // Enable for dynamic year tag
    // uploadRestrictions: { // Configure access control if needed (optional)
    //   signed: true,
    // },
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    setUploadState({ uploading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/djwcvewmf/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUploadSuccess(response.data.public_id); // Pass the uploaded image/video public ID to parent component
      setUploadState({ uploading: false, error: null });
    } catch (error) {
      console.error("Upload error:", error);
      setUploadState({ uploading: false, error: error.message });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {uploadState.uploading && <p>Uploading...</p>}
      {uploadState.error && <p>Error: {uploadState.error}</p>}
      <button onClick={handleUpload} disabled={uploadState.uploading}>
        {text || "Upload"}
      </button>
    </div>
  );
};

export default ImageUpload;
