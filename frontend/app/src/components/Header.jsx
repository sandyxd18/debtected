import React from "react";
import "./Header.css";

export default function Header({ onNavigate }) {
  return (
    <header className="header">
      <div className="header-logo">Debtected</div>

      <nav className="header-nav">
        <button onClick={() => onNavigate("home")} className="nav-btn">
          Home
        </button>
        <button onClick={() => onNavigate("about")} className="nav-btn">
          About
        </button>
      </nav>
    </header>
  );
}