import axios from "axios";
import React, { useEffect, useState } from "react";
import "./addCollaboration.css";
import Modal from "react-modal";

const AddCollaboration = ({ addCollaboration, setAddCollaboration }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    contact: "",
    priority: "high",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const offerId = window.location.pathname.split("/").pop();

  const handleCreateCollaboration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/offer/addCollaboration/${offerId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Collaboration created successfully");
        setAddCollaboration(false);
      } else {
        console.log("Error creating collaboration");
      }
    } catch (error) {
      console.error("Error creating collaboration:", error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add("add-collaboration-open");
  };

  const closeModal = () => {
    setIsOpen(false);
    setAddCollaboration(false);
    document.body.classList.remove("add-collaboration-open");
  };

  useEffect(() => {
    addCollaboration && openModal();
  }, [addCollaboration]);

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <h2>Add Collaboration</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            onChange={(e) => handleChange(e)}
          />
          <select name="priority" onChange={(e) => handleChange(e)}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button onClick={(e) => handleCreateCollaboration(e)}>Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddCollaboration;
