import React from "react";
import "./Contacts.css";
import logo from "./assets/logo.png"; 

const Contacts = () => (
  <div className="app">
    {/* Navbar */}
    <nav className="navbar">
    <img src={logo} alt="Logo" className="logo" />
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="#how-it-works">How it works?</a>
      </div>
    </nav>

    {/* Main Content */}
    <div className="contacts-container">
      <h1 className="contacts-title">Our Team</h1>
      <div className="contacts-grid">
        {[
          { name: "John Doe", image: "./assets/john_doe.jpg" },
          { name: "Jane Smith", image: "./assets/jane_smith.jpg" },
          { name: "Michael Johnson", image: "./assets/michael_johnson.jpg" },
          { name: "Emily Davis", image: "./assets/emily_davis.jpg" },
          { name: "Chris Brown", image: "./assets/chris_brown.jpg" },
          { name: "Laura Wilson", image: "./assets/laura_wilson.jpg" },
        ].map((contact, index) => (
          <div className="contact-card" key={index}>
            <img
              src={contact.image}
              alt={`${contact.name}`}
              className="contact-photo"
            />
            <p className="contact-name">{contact.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Contacts;
