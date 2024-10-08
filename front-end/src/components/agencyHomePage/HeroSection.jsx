import React, { useState } from "react";
import "./heroSection.css";
import { Link } from "react-router-dom";
import mainImage from "/src/SVGs/HomePage/main-image.png";
import leftCards from "/src/SVGs/HomePage/left-cards.svg";
import lightning from "/src/SVGs/HomePage/Lightning 1.svg";
import shape1 from "/src/SVGs/HomePage/Rhode Island.svg";
import softStar from "/src/SVGs/HomePage/Soft Star.svg";
import videoIcon from "/src/SVGs/HomePage/main-video-icon.svg";
import lightElipse from "/src/SVGs/HomePage/Ellipse 33.svg";

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleClickVideo = () => {
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <div className="hero-section">
      <div className="hero-section-left-side">
        <img
          src={softStar}
          className="soft-star"
          alt="soft-star"
          loading="lazy"
        />
        <img
          src={lightElipse}
          className="light-elipse"
          alt="light-elipse"
          loading="lazy"
        />
        <h1>
          <img src={shape1} className="shape1" alt="shape1" loading="lazy" />
          <img
            src={lightning}
            className="lightning"
            alt="lightning"
            loading="lazy"
          />
          Unlock The <span>Potential of Your</span> Agency
        </h1>
        <p>
          Experience the world like never before with our travel services. Start
          your journey with us today!
        </p>
        <div className="hero-section-buttons">
          <img
            className="video-icon"
            src={videoIcon}
            alt="video"
            onClick={handleClickVideo}
            loading="lazy"
          />
          <Link to="/travels">Search</Link>
        </div>
      </div>
      <div className="hero-section-right-side">
        <img src={mainImage} alt="hero-section-image" loading="lazy" />
      </div>
      {/* some absolute images */}
      <img src={leftCards} className="left-cards" alt="icon1" loading="lazy" />

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="video-modal">
          <div className="video-overlay" onClick={handleCloseVideo}></div>
          <div className="video-content">
            <button className="close-button" onClick={handleCloseVideo}>
              &times;
            </button>
            <iframe
              width="859"
              height="483"
              src="https://www.youtube.com/embed/2tuyJFYTMHs"
              title="Wanderlust"
              framorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
