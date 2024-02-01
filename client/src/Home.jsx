import React, { useState, useEffect } from "react";
import FacebookLoginButton from "./FacebookLoginButton";
import {NavLink, Route,Routes} from 'react-router-dom'
import FacebookLogin from '@greatsumini/react-facebook-login';
import { InstagramLogin } from '@amraneze/react-instagram-login';
import InstagramAuth from "./InstagramAuth";

const Home = () => {

    const handleFacebookLogin = response => {
        console.log('Respuesta de Facebook:', response);
        
      };
      const responseInstagram = (response) => {
        console.log(response);
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
        <FacebookLoginButton appId={881902980286107}  onLogin={handleFacebookLogin}/>
        <FacebookLogin
            appId="881902980286107"
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
        <InstagramLogin
            clientId="751902293045624"
            buttonText="Login"
            onSuccess={responseInstagram}
            onFailure={responseInstagram}
        />,
        <InstagramAuth />
    </div>
  );
};

export default Home;
