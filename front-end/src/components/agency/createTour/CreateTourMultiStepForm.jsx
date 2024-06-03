import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CreateTourStepOne from "./CreateTourStepOne";
import "./createTourForm.css";
import CreateTourStepTwo from "./CreateTourStepTwo";
import axios from "axios";
import FileUploading from "../FileUploading";
import CreateTourStepThree from "./CreateTourStepThree";
import toast from "react-hot-toast";

const CreateTourMultiStepForm = ({ setCreateTour, setTourCreated }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [fileIsUploading, setFileIsUploading] = useState(false);
  const agencyId = window.location.pathname
    .split("agency/")
    .pop()
    .split("/")[0];
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    placeFrom: "",
    placeTo: "",
    price: 0,
    description: "",
    categories: "",
    visibility: "public",
    thumbImageUrl: "",
    otherImagesUrl: [],
    videoUrl: "",
    startDate: "",
    endDate: "",
    flightTime: "",
    flightDuration: "",
    agencyId: agencyId,
  });
  console.log(formData);
  const handleInputChange = (event, url) => {
    const { name, value } = event.target;
    if (name === "thumbImageUrl" || name === "videoUrl") {
      setFormData({ ...formData, [name]: url });
    } else if (name === "otherImagesUrl") {
      setFormData({ ...formData, [name]: url });
    } else {
      setFormData({ ...formData, [name]: value }); // Update state for specific field
    }
  };

  const handleCheckboxChange = (category) => {
    const updatedCategories = formData.categories.split(", ").filter(Boolean); // Split the categories string into an array and filter out any empty strings
    const categoryIndex = updatedCategories.indexOf(category);
    if (categoryIndex === -1) {
      updatedCategories.push(category);
    } else {
      updatedCategories.splice(categoryIndex, 1);
    }
    const categoriesString = updatedCategories.join(", ");
    setFormData({ ...formData, categories: categoriesString });
  };

  const handleCreateSubmit = async () => {
    try {
      const response = await axios.post(`${backendUrl}/offer/create`, formData);
      console.log(response);
      toast.success(response.data.message);
      setTourCreated(true);
      closeModal();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setCreateTour(false);
    setIsOpen(false);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <CreateTourStepOne
            step={step}
            prevStep={prevStep}
            nextStep={nextStep}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            fileIsUploading={fileIsUploading}
            setFileIsUploading={setFileIsUploading}
            formData={formData}
          />
        ); // Return the JSX for Step 1 content
      case 2:
        return (
          <>
            <CreateTourStepTwo
              step={step}
              prevStep={prevStep}
              nextStep={nextStep}
              closeModal={closeModal}
              handleInputChange={handleInputChange}
              fileIsUploading={fileIsUploading}
              setFileIsUploading={setFileIsUploading}
              formData={formData}
            />
          </>
        );
      case 3:
        return (
          <CreateTourStepThree
            step={step}
            prevStep={prevStep}
            closeModal={closeModal}
            handleInputChange={handleInputChange}
            handleCreateSubmit={handleCreateSubmit}
          />
        );
    }
  };

  useEffect(() => {
    Modal.setAppElement("#root"); // Set the app element for react-modal
    openModal();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        {renderStepContent()}
      </Modal>
      {fileIsUploading && <FileUploading />}
    </>
  );
};

export default CreateTourMultiStepForm;
