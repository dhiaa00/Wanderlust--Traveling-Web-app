import React from "react";
import "./agencyManagement.css";
import agencyDashboardImage from "/src/SVGs/HomePage/agency-dashboard-image.svg";
import agencyManagementBackground from "/src/SVGs/HomePage/agency-management-background.svg";

const AgencyManagement = () => {
  return (
    <div className="agency-management">
      <img
        className="agency-management-background"
        src={agencyManagementBackground}
        alt=""
        loading="lazy"
      />
      <div className="side-image">
        <img src={agencyDashboardImage} alt="" loading="lazy" />
      </div>
      <div className="agency-management-description">
        <h2>Allocate Leads and Simplify agency Management</h2>
        <p>
          Unique and powerful suite of software to run your entire business,
          brought to you by a company with the long term vision to transform the
          way you work.
        </p>
        <div className="agency-management-element">
          {/* the h3 has an ::after that is a blue bullet  */}
          <h3>Lead A Tourism</h3>
          <p>
            Guide Helps Companies Increase Customer & Agent Satisfaction, Also
            Reducing Support Costs.
          </p>
        </div>
        <div className="agency-management-element">
          {/* the h3 has an ::after that is a blue bullet  */}
          <h3>Colaborate with other</h3>
          <p>
            Group Your Contacts By Location, Age, And Almost Any Behavior With
            Advanced Segmentation Tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgencyManagement;
