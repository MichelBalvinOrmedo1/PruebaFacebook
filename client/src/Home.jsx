import React, { useState, useEffect } from "react";
import FacebookLoginButton from "./FacebookLoginButton";

const Home = () => {

    const handleFacebookLogin = response => {
        console.log('Respuesta de Facebook:', response);
        // Aquí puedes manejar la respuesta de Facebook como desees
      };
  return (
    <div>
        <FacebookLoginButton appId="881471950379451"  onLogin={handleFacebookLogin}/>

    </div>
  );
};

export default Home;
