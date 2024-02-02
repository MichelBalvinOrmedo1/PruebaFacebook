import React, { useState } from 'react';
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const InstagramAuth = ({ clientId, onAuthorization, btnText }) => {
  const redirectUri = 'https://pruebaapifacebook.onrender.com/';
  const scope = 'user_profile,user_media';
  const responseType = 'code';

  const handleAuthClick = async () => {
    const authWindow = window.open(
      `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`,
      '_blank',
      'width=600,height=600'
    );

    const checkWindowClosed = setInterval(() => {
      try {
        if (authWindow.closed) {
          clearInterval(checkWindowClosed);
          console.log('Ventana cerrada');
        } else {
          let authCode = null;

          try {
            const href = authWindow.location.href;
            authCode = getAuthCodeFromUrl(href);
          } catch (error) {
            // Manejar errores al intentar acceder a la propiedad href
          }

          if (authCode) {
            clearInterval(checkWindowClosed);
            console.log('Código obtenido:', authCode);
            authWindow.close();
            obtainAccessToken(authCode);
          }
        }
      } catch (error) {
        console.error('Error al verificar la ventana:', error);
      }
    }, 1000);
  };

  const getAuthCodeFromUrl = (url) => {
    const match = url.match(/code=([^&]*)/);
    return match && match[1];
  };

  const obtainAccessToken = async (authCode) => {
    try {
      const response = await fetch(`${URL}/getAccessToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId,
          redirectUri,
          code: authCode,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        onAuthorization(data);
      } else {
        console.error('Error al obtener el token:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud de token:', error);
    }
  };

  return (
    <> 
      <button onClick={handleAuthClick}>{btnText}</button>
    </>
  );
};

export default InstagramAuth;
