import React from "react";
import "./footer.css";
import sltLogo from "../assets/sltLogo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={sltLogo} alt="SLT Mobitel" />
        </div>

        <nav className="footer-nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li className="separator">/</li>
            <li>
              <a href="/history">History</a>
            </li>
            <li className="separator">/</li>
            <li>
              <a href="/reports">Reports</a>
            </li>
          </ul>
        </nav>

        <div className="footer-contact">
          <a href="/contact">Contact Us</a>
        </div>

        <div className="footer-copyright">
          © Sri Lanka Telecom PLC All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
