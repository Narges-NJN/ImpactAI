import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import HowItWorks from "./HowItWorks";
import Contacts from "./Contacts"; // Импорт страницы Contacts

const MainApp = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} /> {/* Главная страница */}
      <Route path="/how-it-works" element={<HowItWorks />} /> {/* How It Works */}
      <Route path="/contacts" element={<Contacts />} /> {/* Contacts */}
    </Routes>
  </Router>
);

export default MainApp;
