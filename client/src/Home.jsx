import React, { useState, useEffect } from "react";
import FacebookLoginButton from "./FacebookLoginButton";
import {Link, NavLink, Route,Routes} from 'react-router-dom'

const Home = () => {

    const handleFacebookLogin = response => {
        console.log('Respuesta de Facebook:', response);
        // Aquí puedes manejar la respuesta de Facebook como desees
      };
  return (
    <div>

        <ul>
            <li>
                <Link className={({isActive}) => isActive } to={'/'}> Home</Link>
            </li>
            <li>
                <Link className={(data) => console.log(data)} to={'/privacypolicy'}> privacypolicy</Link>
            </li>
            <li>
                <Link className={(data) => console.log(data)} to={'/termsofservice'}> termsofservice</Link>
            </li>
        </ul>
        <FacebookLoginButton appId="881471950379451"  onLogin={handleFacebookLogin}/>

    </div>
  );
};

export default Home;
