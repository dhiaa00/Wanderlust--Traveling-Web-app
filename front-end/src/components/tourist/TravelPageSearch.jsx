import { useState } from "react";
import searchIcon from "/src/SVGs/HomePage/Tourist/search.svg";
import filterIcon from "/src/SVGs/HomePage/Tourist/filter-icon.svg";
import "./travelpagesearch.css";
import { useNavigate } from "react-router-dom";
import FiltersForm from "./SearchFilters/FiltersForm";

const TravelPageSearch = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    // get the word that comes after destination= garding that it might be properties after that word separated by &
    destination: window.location.pathname.split("/search/")[1]
      ? window.location.pathname
          .split("/search/")[1]
          .split("&")[0]
          .replace("destination=", "")
      : "",
  });
  const [filtersOpen, setFilterOpen] = useState(false);

  const handleSearch = () => {
    if (!window.location.pathname.split("/search/")[1]) {
      navigate(
        `/search/destination=${search.destination}&budget=&startDate=&endDate=`
      );
      return;
    }
    const newLink = window.location.pathname
      .split("/search/")[1]
      .split("&")
      .map((el) => {
        if (el.includes("destination")) {
          return `destination=${search.destination}`;
        } else {
          return el;
        }
      })
      .join("&");
    navigate(`/search/${newLink}`);
  };

  const handleFilter = () => {
    setFilterOpen(true);
  };
  return (
    <>
      <div className="main-travel-searchbar">
        <div className="search-input search-filter">
          <input
            value={search.destination}
            onChange={(e) =>
              setSearch({ ...search, destination: e.target.value })
            }
            placeholder="Search"
            type="text"
          />
          <img src={searchIcon} alt="search" />
        </div>
        <div className="search-searchBtn" onClick={handleSearch}>
          Search
        </div>
        <div
          className="filter-by-location search-filterBtn"
          onClick={handleFilter}>
          Filter <img src={filterIcon} alt="filterIcon" />
        </div>
      </div>
      {filtersOpen && <FiltersForm setFilterOpen={setFilterOpen} />}
    </>
  );
};

export default TravelPageSearch;
