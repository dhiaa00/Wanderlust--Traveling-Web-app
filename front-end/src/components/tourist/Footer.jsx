import React from "react";
import footerLogo from "/src/SVGs/HomePage/footer-logo.svg";
import instagram from "/src/SVGs/HomePage/Instagram.svg";
import facebook from "/src/SVGs/HomePage/Facebook.svg";
import twitter from "/src/SVGs/HomePage/Twiter.svg";
import linkedin from "/src/SVGs/HomePage/Linked in.svg";
import youtube from "/src/SVGs/HomePage/Youtube.svg";
import latestNews from "/src/SVGs/HomePage/footer-latest-news.svg";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-and-links">
          <div className="logo">
            <img src={footerLogo} alt="logo" />
          </div>
          <nav className="footer-links">
            <a href="">
              <img src={instagram} alt="instagram" />
            </a>
            <a href="">
              <img src={facebook} alt="facebook" />
            </a>
            <a href="">
              <img src={twitter} alt="twitter" />
            </a>
            <a href="">
              <img src={linkedin} alt="linkedin" />
            </a>
            <a href="">
              <img src={youtube} alt="youtube" />
            </a>
          </nav>
        </div>
        <div className="titles">
          <h2>Usefull Links</h2>
          <h2>Service</h2>
          <h2>Contact us</h2>
          <h2>Our Latest News</h2>
        </div>
        <div className="links">
          <div className="usefull-links">
            <a href="/">Home</a>
            <a href="/travels">Travels</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="service">
            <a href="/">Sale</a>
            <a href="/">Marketing</a>
            <a href="/">Services</a>
          </div>
          <div className="contact-us">
            <a href="/">+213 550 61 42 84</a>
            <a href="/">Tipaza, Algeria</a>
          </div>
          <div className="latest-news">
            <img src={latestNews} alt="news" />
          </div>
        </div>
        <p className="footer-last-element">
          Copyright © Wanderlust 2024 | Created by A Great Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;
