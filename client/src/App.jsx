import React, { useState, useEffect } from "react";
import PrivacyPolicy from "./PrivacyPolicy"
import TermsOfService from "./TermsOfService"


import {Route,Routes} from 'react-router-dom'
import Home from "./Home";
function App() {
  
  const handleFacebookLogin = response => {
    console.log('Respuesta de Facebook:', response);
    // Aquí puedes manejar la respuesta de Facebook como desees
  };
 
  return (

    
    <div className="App">
      <Routes>
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
          <Route path="/" element={<Home />} />
      </Routes>
      

    </div>
  );
}

export default App;
