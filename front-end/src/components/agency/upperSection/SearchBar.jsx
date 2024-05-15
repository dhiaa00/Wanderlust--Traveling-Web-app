import React, { useState } from "react";
import "./searchBar.css";
import VoiceSearchIcon1 from "/src/SVGs/voice-search-icon.svg";
import SearchIcon from "/src/SVGs/search-icon.svg";

const SearchBar = ({ setSearchInput }) => {
  const [voiceSearchEnabled, setVoiceSearchEnabled] = useState(false);
  const [textSpeeched, setTextSpeeched] = useState("");

  const handleVoiceSearch = () => {
    if (!voiceSearchEnabled) {
      setRegularSearch(false);
      const recognition = new window.webkitSpeechRecognition();
      recognition.start();
      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setTextSpeeched(speechToText);
        setSearchInput(speechToText);
      };
      // end recognition when voiceSearchenabled == false
      recognition.onend = () => {
        if (!voiceSearchEnabled) {
          recognition.stop();
        }
      };
    }

    setVoiceSearchEnabled(!voiceSearchEnabled);
    setTextSpeeched("");
    setSearchInput("");
    // speech recognition using web speech api
  };

  const [regularSearch, setRegularSearch] = useState(false);

  const handleRegularSearch = () => {
    setVoiceSearchEnabled(false);
    setRegularSearch(!regularSearch);
  };
  return (
    <div className="agency-search-bar">
      <div className="voice-search">
        <img
          className="voice-search-icon"
          src={VoiceSearchIcon1}
          alt="voice search icon"
          onClick={handleVoiceSearch}
        />
        <p
          className={
            voiceSearchEnabled || regularSearch ? "voice-search-enabled-p" : ""
          }>
          Voice Search
        </p>
        <input
          className={
            voiceSearchEnabled || regularSearch
              ? "voice-search-enabled-input "
              : ""
          }
          type="text"
          placeholder="Search..."
          value={textSpeeched}
          onChange={(e) => {
            setTextSpeeched(e.target.value);
            setSearchInput(e.target.value);
          }}
        />
        <div
          className={
            "voice-waves-icon " +
            (voiceSearchEnabled ? "voice-waves-icon-activated" : "")
          }>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>
      <div
        className={
          "agency-search " + (voiceSearchEnabled ? "voice-search-enabled" : "")
        }>
        <img
          className="regular-search-icon"
          src={SearchIcon}
          alt="search icon"
          onClick={handleRegularSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
