import React from "react";
import powerfullSettings from "/src/SVGs/HomePage/Powerfull-settings.svg";
import userFriendly from "/src/SVGs/HomePage/user-friendly.svg";
import integratedPlatform from "/src/SVGs/HomePage/integrated-platform.svg";
import "./features.css";

const Features = () => {
  return (
    <div className="home-page-features">
      <h2>Explore Our Features</h2>
      <p>
        Unique and powerful suite of software to run your entire business,
        brought to you by a company with the long term vision to transform the
        way you work.
      </p>
      <div className="features-container">
        <div className="feature powerfull-settings">
          <img src={powerfullSettings} alt="" />
          <div className="feature-info">
            <h3>Powerfull Settings</h3>
            <p>Provide excellent customer service. Answer more tickets.</p>
          </div>
        </div>
        <div className="feature user-friendly">
          <img src={userFriendly} alt="" />
          <div className="feature-info">
            <h3>User Friendly</h3>
            <p>
              Use Timeline to plan projects right how the pieces fit together.
            </p>
          </div>
        </div>
        <div className="feature integrated-platform">
          <img src={integratedPlatform} alt="" />
          <div className="feature-info">
            <h3>Integrated Platform</h3>
            <p>
              Seamlessly connect all your business tools and systems in one
              place
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
