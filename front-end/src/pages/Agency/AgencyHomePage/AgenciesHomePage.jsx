import mainImage from "/src/SVGs/HomePage/main-image.svg";
import leftCards from "/src/SVGs/HomePage/left-cards.svg";
import lightning from "/src/SVGs/HomePage/Lightning 1.svg";
import shape1 from "/src/SVGs/HomePage/Rhode Island.svg";
import softStar from "/src/SVGs/HomePage/Soft Star.svg";
import videoIcon from "/src/SVGs/HomePage/main-video-icon.svg";
import { Link } from "react-router-dom";
import "./agenciesHomePage.css";

const AgenciesHomePage = () => {
  return (
    <div className="main-agencies-page">
      <div className="hero-section">
        <div className="hero-section-left-side">
          <h1>Unlock the Potential of Your Agency</h1>
          <p>
            Experience the world like never before with our travel services.
            Start your journey with us today!
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
    </div>
  );
};

export default AgenciesHomePage;
