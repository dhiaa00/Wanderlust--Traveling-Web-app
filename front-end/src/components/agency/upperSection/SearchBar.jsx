import React from "react";
import "./searchBar.css";
import VoiceSearchIcon1 from "/src/SVGs/voice-search-icon.svg";
import VoiceSearchIcon2 from "/src/SVGs/voice-search-icon2.svg";
import SearchIcon from "/src/SVGs/search-icon.svg";

const SearchBar = () => {
  return (
    <div className="agency-search-bar">
      <div className="voice-search">
        <img src={VoiceSearchIcon1} alt="voice search icon" />
        <p>Voice Search</p>
        <img src={VoiceSearchIcon2} alt="voice search icon" />
      </div>
      <div className="agency-search">
        <img src={SearchIcon} alt="search icon" />
      </div>
    </div>
  );
};

export default SearchBar;
