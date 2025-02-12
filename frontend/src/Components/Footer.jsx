import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          {/* Logo with forward slashes */}
          <div className="logo-slashes">//</div>
          <div className="logo-text">
            <span className="slt">SLT</span>
            <span className="mobitel">MOBITEL</span>
          </div>
        </div>
        
        <nav className="footer-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li className="separator">/</li>
            <li><a href="/history">History</a></li>
            <li className="separator">/</li>
            <li><a href="/reports">Reports</a></li>
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