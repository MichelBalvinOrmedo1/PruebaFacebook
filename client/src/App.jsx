import React, { useState, useEffect } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

import Home from "./Home.jsx";
import {Routes, Route } from 'react-router-dom'
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET al endpoint del backend
    fetch(`$https://michelface.onrender.com/privacypolicys`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error al obtener datos del backend:", error));
  }, []);

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsofservice" element={<TermsOfService />} />
      </Routes>
    </div>
  );
}

export default App;
