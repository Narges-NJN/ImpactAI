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
        <a href="how-it-works">How it works?</a>
      </div>
    </nav>

    {/* Main Content */}
    <div className="contacts-container">
      <h1 className="contacts-title">Our Team</h1>
      <div className="contacts-grid">
        {[
          { 
            name: "Nurbek Khalmatay", 
            linkedin: "https://linkedin.com/in/khalmatay" 
          },
          { 
            name: "Rouaa Belhaj Ali", 
            linkedin: "https://www.linkedin.com/in/rouaa-belhaj-ali-7a8520257/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
          },
          { 
            name: "Daniela", 
            linkedin: "https://github.com/NoQuitt" 
          },
          { 
            name: "Narges Najiantabriz", 
            linkedin: "https://www.linkedin.com/in/narges-najian/" 
          },
          { 
            name: "Sebastiano Aloscari", 
            linkedin: "https://www.linkedin.com/in/sebastiano-aloscari/" 
          },
          { 
            name: "Aliya Ali", 
            linkedin: "https://www.linkedin.com/in/aliya-ali-0807b1229/" 
          },
        ].map((contact, index) => (
          <div className="contact-card" key={index}>
            <a 
              href={contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-name-link"
            >
              {contact.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Contacts;
