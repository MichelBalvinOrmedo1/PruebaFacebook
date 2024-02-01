import React, { useState, useEffect } from "react";
import PrivacyPolicy from "./PrivacyPolicy"
import TermsOfService from "./TermsOfService"


import {Route,Routes} from 'react-router-dom'
import Home from "./Home";
function App() {
  
  const handleFacebookLogin = response => {
    console.log('Respuesta de Facebook:', response);
    
  };
 
  return (

    
    <div className="App">
      <Routes>
          
          <Route path="/" Component={<Home />} />
         
        
           <Route path="/privacypolicy" Component={<PrivacyPolicy />} />
          <Route path="/termsofservice" Component={<TermsOfService />} />
        
      </Routes>
      

    </div>
  );
}

export default App;
