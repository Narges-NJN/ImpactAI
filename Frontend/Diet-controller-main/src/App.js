import React from "react";
import "./App.css";
import logo from "./assets/logo.png"
import chat_image from "./assets/chat_image.png"

const App = () => (
  <div className="app">
    {/* Navbar */}
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="nav-links">
        <a href="#how-it-works">How it works?</a>
        <a href="#contacts">Contacts</a>
        <a href="#faq">FAQ</a>
      </div>
    </nav>

    {/* Main Content */}
    <div className="main-content">
      <div className="left-section">
        <h1>Managing your diabetic meal plans has never been easier!</h1>
        <p>
          Get the best personalized meal plans based on your health condition
          and preferences.
        </p>
        <button className="chat-button">Start to chat</button>
      </div>
      <div className="right-section">
        <p className="ai-description">
          AI powered health data analysis<br />
          Explainable meal plans based on medical facts
        </p>
        <img src={chat_image} alt="Chat illustration" className="chat-image" />
      </div>
    </div>
  </div>
);

export default App;
