import React from "react";
import "./HowItWorks.css";
import logo from "./assets/logo.png"; 

const HowItWorks = () => (
  <div className="app">
    {/* Navbar */}
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/contacts">Contacts</a>
        </div>
    </nav>

    {/* Основной контент */}
    <div className="main-content">
      <div className="left-section large-content"> {/* Применяем новый класс large-content */}
        <ul className="big-text-list">
          <li>
            Health data of the user is gathered (MBI, blood sugar levels, etc.)
            for personalized advice.
          </li>
          <li>
            Powered by llama3.1 through AI/ML API, combined with accurate
            datasets of diabetes-friendly food.
          </li>
          <li>
            Users can chat with DiaCura on Telegram or (in future) WhatsApp, or
            via our own website.
          </li>
        </ul>
        <a href="https://t.me/DiaCura_bot" target="_blank" rel="noopener noreferrer">
          <button className="chat-button">Start to chat</button>
        </a>
      </div>
    </div>
  </div>
);

export default HowItWorks;
