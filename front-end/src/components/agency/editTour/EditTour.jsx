import React, { useState } from "react";
import "./editTour.css";
import Modal from "react-modal";

import FileUploading from "../FileUploading";
import EditTourStepOne from "./EditTourStepOne";
import EditTourStepTwo from "./EditTourStepTwo";
import axios from "axios";

const EditTour = ({ setEditTourOpen, setTourUpdated }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [fileIsUploading, setFileIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setEditTourOpen(false);
    setTourUpdated(false);
    setIsOpen(false);
  };

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    flightTime: "",
    flightDuration: "",
    country: "",
    placeFrom: "",
    placeTo: "",
    description: "",
    thumbImageUrl: "",
    price: "",
  });

  const handleInputChange = (event, url) => {
    const { name, value } = event.target;
    if (name === "thumbImageUrl" || name === "videoUrl") {
      setFormData({ ...formData, [name]: url });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const tourId = window.location.pathname.split("/").pop();
  const agencyId = JSON.parse(localStorage.getItem("agency"))._id;

  const handleEditPost = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/offer/update/${tourId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      setTourUpdated(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Tour Modal">
        {currentStep === 1 && (
          <EditTourStepOne
            handleInputChange={handleInputChange}
            setFileIsUploading={setFileIsUploading}
            handleNextStep={handleNextStep}
            closeModal={closeModal}
          />
        )}
        {currentStep === 2 && (
          <EditTourStepTwo
            handleInputChange={handleInputChange}
            setFileIsUploading={setFileIsUploading}
            handleEditPost={handleEditPost}
            handlePreviousStep={handlePreviousStep}
          />
        )}
      </Modal>
      {fileIsUploading && <FileUploading />}
    </div>
  );
};

export default EditTour;
