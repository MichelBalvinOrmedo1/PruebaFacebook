import React, { useState } from 'react';
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const InstagramAuth = ({ onAuthorization }) => {
  const clientId = '751902293045624';
  const redirectUri = 'https://pruebaapifacebook.onrender.com/';
  const scope = 'user_profile,user_media';
  const responseType = 'code';

  const [authCode, setAuthCode] = useState(null);

  const handleAuthClick = () => {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
    const authWindow = window.open(authUrl, '_blank', 'width=600,height=600');

    // Comprobar si la ventana se cerró o si se obtuvo el código
    const checkWindowClosed = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(checkWindowClosed);
      }
      if (authCode) {
        clearInterval(checkWindowClosed);

        // Ahora que se tiene el código, realizar la solicitud al backend para obtener el token
        fetch(`${URL}/getAccessToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clientId,
            redirectUri,
            code: authCode,
          }),
        })
          .then(response => response.json())
          .then(data => {
            // Ejecutar la función de retorno de llamada con el response
            onAuthorization(data);
          })
          .catch(error => {
            console.error('Error al obtener el token:', error);
          });
      }
    }, 1000);
  };

  window.addEventListener('message', event => {
    // Escuchar el mensaje desde la ventana emergente con el código
    if (event.origin === 'https://pruebaapifacebook.onrender.com' && event.data.code) {
      setAuthCode(event.data.code);
    }
  });

  return (
    <div>
      <h1>Instagram Authorization</h1>
      <button onClick={handleAuthClick}>Authorize with Instagram</button>
    </div>
  );
};

export default InstagramAuth;
