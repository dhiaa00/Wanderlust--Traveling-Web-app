import React from "react";
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
  return (
    <div className="hero-section">
      <div className="hero-section-left-side">
        <img src={softStar} className="soft-star" alt="soft-star" />
        <img src={lightElipse} className="light-elipse" alt="light-elipse" />
        <h1>
          <img src={shape1} className="shape1" alt="shape1" />
          <img src={lightning} className="lightning" alt="lightning" />
          Unlock The <span>Potential of Your</span> Agency
        </h1>
        <p>
          Experience the world like never before with our travel services. Start
          your journey with us today!
        </p>
        <div className="hero-section-buttons">
          <img src={videoIcon} alt="video" />
          <Link to="/">Search</Link>
        </div>
      </div>
      <div className="hero-section-right-side">
        <img src={mainImage} alt="hero-section-image" />
      </div>
      {/* some absolute images */}
      <img src={leftCards} className="left-cards" alt="icon1" />
    </div>
  );
};

export default HeroSection;
