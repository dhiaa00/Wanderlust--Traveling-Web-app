import React from "react";

const AgencyNavbar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <div className="agency-navbar">
      <div className="agency-navbar__logo"></div>
      <div className="agency-navbar__links">
        {displayMenu ? (
          <div className="agency-navbar__menu">{/* waiting for design */}</div>
        ) : (
          // svg element for the menu icon
          <svg path="../../../SVGs/menu icon.svg"></svg>
        )}
      </div>
      {/* help icon */}
      <svg path="../../../SVGs/help.svg"></svg>
    </div>
  );
};

export default AgencyNavbar;
