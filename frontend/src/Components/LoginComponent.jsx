import React from "react";
import "./Login.css";
import sltLogo from "../assets/sltLogo.png";
import calenderImage from "../assets/LoginImage.png";

function LoginComponent() {
  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Section */}
        <div className="left-section">
          <div className="logo">
            <img src={sltLogo} alt="SLT Mobitel" />
          </div>
          <div className="illustration">
            <img src={calenderImage} alt="SLT Mobitel" />
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <form className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter Email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter Password" />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
