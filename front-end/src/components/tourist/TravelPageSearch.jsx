import React from "react";
import searchIcon from "/src/SVGs/HomePage/Tourist/search.svg";
import "./travelpagesearch.css";

const TravelPageSearch = () => {
  return (
    <div className="main-travel-searchbar">
      <div className="search-input search-filter">
        <input placeholder="Search" type="text" />
        <img src={searchIcon} alt="search" />
      </div>
      <div className="time-duration search-filter">
        <input placeholder="Time Duration" type="number" />
        Days
      </div>
      <div className="price-filter search-filter">
        <input placeholder="Price" type="number" />
      </div>
      <div className="filter-by-location search-filter">Filter</div>
    </div>
  );
};

export default TravelPageSearch;
