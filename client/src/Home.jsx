import React, { useState, useEffect } from "react";
import FacebookLoginButton from "./FacebookLoginButton";
import {NavLink, Route,Routes} from 'react-router-dom'
import FacebookLogin from '@greatsumini/react-facebook-login';

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
        <FacebookLoginButton appId={741161537955952}  onLogin={handleFacebookLogin}/>
        <FacebookLogin
            appId="741161537955952"
            onSuccess={(response) => {
                console.log('Login Success!', response);
            }}
            onFail={(error) => {
                console.log('Login Failed!', error);
            }}
            onProfileSuccess={(response) => {
                console.log('Get Profile Success!', response);
            }}
            scope="public_profile, email"
            />
    </div>
  );
};

export default Home;
