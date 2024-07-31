import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./filtersForm.css";

const FiltersForm = ({ setFilterOpen }) => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const [form, setForm] = useState({
    budget: "500000",
    startDate: "",
    endDate: "",
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFilterOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let addedQueryArray = [];
    form.budget
      ? addedQueryArray.push(`budget=${form.budget}`)
      : addedQueryArray.push(`budget=`);

    form.startDate
      ? addedQueryArray.push(`startDate=${form.startDate}`)
      : addedQueryArray.push(`startDate=`);

    form.endDate
      ? addedQueryArray.push(`endDate=${form.endDate}`)
      : addedQueryArray.push(`endDate=`);
    // get the path
    const path = window.location.pathname;
    if (!path.split("/search/")[1]) {
      navigate(`/search/destination=&${addedQueryArray.join("&")}`);
      closeModal();
      return;
    }
    // replace each query with the new one if it exists
    const newLink = path
      .split("/search/")[1]
      .split("&")
      .map((el) => {
        const query = addedQueryArray.find((query) =>
          query.includes(el.split("=")[0])
        );
        if (query) {
          return query;
        } else {
          return el;
        }
      });
    console.log(newLink);
    navigate(`/search/${newLink.join("&")}`);
    closeModal();
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="filters-container">
      <button onClick={openModal}>Open Filters</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Filters</h2>
        <form onSubmit={handleSubmit}>
          {/* Add your filter options here */}
          <label>
            Price Range:
            <input
              placeholder="Maximum Price"
              type="range"
              name="budget"
              min="0"
              minPrice="0 Da"
              max="1000000"
              value={form.budget}
              currentPrice={`${form.budget} DA`}
              onChange={handleInputChange}
            />
          </label>
          <label>
            From:
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            To:{" "}
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleInputChange}
            />
          </label>

          <button type="submit">Apply Filters</button>
        </form>
        <button className="close-button" onClick={closeModal}>
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default FiltersForm;
