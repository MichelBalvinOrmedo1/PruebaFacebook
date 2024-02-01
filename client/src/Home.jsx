import React, { useState, useEffect } from "react";
import FacebookLoginButton from "./FacebookLoginButton";
import {NavLink, Route,Routes} from 'react-router-dom'

const Home = () => {

    const handleFacebookLogin = response => {
        console.log('Respuesta de Facebook:', response);
        // Aquí puedes manejar la respuesta de Facebook como desees
      };
  return (
    <div>

        <ul>
            <li>
                <NavLink className={(data) => console.log(data)} to={'/'}> Home</NavLink>
            </li>
            <li>
                <NavLink className={(data) => console.log(data)} to={'/privacypolicy'}> privacypolicy</NavLink>
            </li>
            <li>
                <NavLink className={(data) => console.log(data)} to={'/termsofservice'}> termsofservice</NavLink>
            </li>
        </ul>
        <FacebookLoginButton appId="881471950379451"  onLogin={handleFacebookLogin}/>

    </div>
  );
};

export default Home;
