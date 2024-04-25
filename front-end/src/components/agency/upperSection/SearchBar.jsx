import React, { useState } from "react";
import "./searchBar.css";
import VoiceSearchIcon1 from "/src/SVGs/voice-search-icon.svg";
import SearchIcon from "/src/SVGs/search-icon.svg";

const SearchBar = () => {
  const [voiceSearchEnabled, setVoiceSearchEnabled] = useState(false);
  const [textSpeeched, setTextSpeeched] = useState("");

  const handleVoiceSearch = () => {
    setVoiceSearchEnabled(!voiceSearchEnabled);
    setTextSpeeched("");
    // speech recognition using web speech api
    const recognition = new window.webkitSpeechRecognition();
    recognition.start();
    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTextSpeeched(speechToText);
    };
    // end recognition when voiceSearchenabled == false
    recognition.onend = () => {
      if (!voiceSearchEnabled) {
        recognition.stop();
      }
    };
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
        <p className={voiceSearchEnabled ? "voice-search-enabled-p" : ""}>
          Voice Search
        </p>
        <input
          className={voiceSearchEnabled ? "voice-search-enabled-input" : ""}
          type="text"
          placeholder="Search..."
          value={textSpeeched}
          onChange={(e) => setTextSpeeched(e.target.value)}
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
        <img src={SearchIcon} alt="search icon" />
      </div>
    </div>
  );
};

export default SearchBar;
