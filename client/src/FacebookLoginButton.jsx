// FacebookLoginButton.jsx
import React, { useEffect, useState } from 'react';

const FacebookLoginButton = ({ appId, onLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: appId,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v9.0',         
        });

        window.FB.getLoginStatus(response => {
          if (response.status === 'connected') {
            setIsLoggedIn(true);
          }
        });

        window.FB.Event.subscribe('auth.statusChange', (response) => {
          if (response.status === 'connected') {
            setIsLoggedIn(true);
            onLogin(response); // Envía la respuesta al componente principal
          } else {
            setIsLoggedIn(false);
          }
        });
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    };

    loadFacebookSDK();
  }, [appId, onLogin]);

  const handleFacebookButtonClick = async () => {
    try {
      const response = await new Promise((resolve) => {
        window.FB.login(resolve);
      });

      if (response.status === 'connected') {
        setIsLoggedIn(true);
        onLogin(response); // Envía la respuesta al componente principal
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error al autenticar con Facebook:', error);
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <p>¡Has iniciado sesión con Facebook!</p>
      ) : (
        <button onClick={handleFacebookButtonClick}>Iniciar sesión con Facebook</button>
      )}
    </div>
  );
};

export default FacebookLoginButton;
