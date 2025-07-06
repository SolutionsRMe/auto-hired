import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upgrade from "@/pages/Upgrade";
// Import other pages as needed

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Dashboard Placeholder</div>} />
        <Route path="/upgrade" element={<Upgrade />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}
