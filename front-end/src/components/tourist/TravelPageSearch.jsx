import React, { useState } from "react";
import searchIcon from "/src/SVGs/HomePage/Tourist/search.svg";
import filterIcon from "/src/SVGs/HomePage/Tourist/filter-icon.svg";
import axios from "axios";
import "./travelpagesearch.css";

const TravelPageSearch = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
  });
  console.log("search: ", search);
  console.log("backendUrl: ", backendUrl);
  const handleSearch = async () => {
    try {
      const response = await axios.post(`${backendUrl}/user/search`, {
        search,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="main-travel-searchbar">
      <div className="search-input search-filter">
        <input
          value={search.destination}
          onChange={(e) => {
            console.log(e.target.value);
            setSearch({ ...search, destination: e.target.value });
          }}
          placeholder="Search"
          type="text"
        />
        <img src={searchIcon} alt="search" />
      </div>
      <div className="search-searchBtn" onClick={handleSearch}>
        Search
      </div>
      <div className="filter-by-location search-filterBtn">
        Filter <img src={filterIcon} alt="filterIcon" />
      </div>
    </div>
  );
};

export default TravelPageSearch;
