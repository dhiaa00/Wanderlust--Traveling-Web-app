import React from "react";
import billingBackground from "/src/SVGs/HomePage/billing-background.svg";
import { Link } from "react-router-dom";
import "./billing.css";

const Billing = () => {
  return (
    <div className="billing">
      <h2>Partner with Us to Redefine Travel</h2>
      <p>
        Leverage our cutting-edge technology to stay ahead of the competition.
      </p>
      <div className="billing-plans">
        <img src={billingBackground} alt="background" loading="lazy" />
        {/* each billing plan is absolut refering to .billing-plans */}
        <div className="billing-plan">
          <h3>Free</h3>
          <p>
            designed to help small travel agencies get started. Enjoy basic
            features to manage your listings and track performance.
          </p>
          <div className="plan-features">
            {/* a green correct mark in the right of each feature */}
            <ul>
              <li>Limited Listings</li>
              <li>Basic Analytics</li>
              <li>Limited Support</li>
              <li>No Featured Listings</li>
            </ul>
          </div>
          <Link className="choose-plan-button" to="/signup/agency">
            Get Started
          </Link>
        </div>
        <div className="billing-plan">
          <h3>$30/Mo</h3>
          <p>
            designed to help small travel agencies get started. Enjoy basic
            features to manage your listings and track performance.
          </p>
          <div className="plan-features">
            {/* a green correct mark in the right of each feature */}
            <ul>
              <li>Unlimited Listings</li>
              <li>Advanced Analytics</li>
              <li>Priority Support</li>
              <li>Featured Listings</li>
              <li>Professional Photography</li>
              <li>Virtual Tours</li>
              <li>Marketing and Promotional Assistance</li>
            </ul>
          </div>
          <button className="choose-plan-button">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
