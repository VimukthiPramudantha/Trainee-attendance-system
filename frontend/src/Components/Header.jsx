import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import sltLogo from "../assets/sltLogo.png";

const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src={sltLogo} alt="SLT Mobitel" />
      </div>

      {/* Navigation */}
      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          History
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Reports
        </NavLink>
      </nav>

      {/* Logout Button */}
      <button className="logout">Logout</button>
    </header>
  );
};

export default Header;
