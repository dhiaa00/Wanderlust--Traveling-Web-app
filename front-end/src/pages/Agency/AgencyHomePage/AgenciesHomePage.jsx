import React from "react";
import "./agenciesHomePage.css";
import HeroSection from "../../../components/agencyHomePage/HeroSection";
import Features from "../../../components/agencyHomePage/Features";
import AgencyManagement from "../../../components/agencyHomePage/AgencyManagement";
import Testimonials from "../../../components/agencyHomePage/Testimonials";
import Billing from "../../../components/agencyHomePage/Billing";
import Footer from "../../../components/tourist/Footer";

const AgenciesHomePage = () => {
  return (
    <div className="main-agencies-page">
      <HeroSection />
      <Features />
      <AgencyManagement />
      <Testimonials />
      <Billing />
      <Footer />
    </div>
  );
};

export default AgenciesHomePage;
