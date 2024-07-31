import React from "react";
import "./agenciesHomePage.css";
import HeroSection from "../../../components/agencyHomePage/HeroSection";
import Features from "../../../components/agencyHomePage/Features";
import AgencyManagement from "../../../components/agencyHomePage/AgencyManagement";

const AgenciesHomePage = () => {
  return (
    <div className="main-agencies-page">
      <HeroSection />
      <Features />
      <AgencyManagement />
    </div>
  );
};

export default AgenciesHomePage;
