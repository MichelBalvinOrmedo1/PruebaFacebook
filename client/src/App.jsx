import React, { useState, useEffect } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

import Home from "./Home.jsx";
import {Routes, Route } from 'react-router-dom'
function App() {
  

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
