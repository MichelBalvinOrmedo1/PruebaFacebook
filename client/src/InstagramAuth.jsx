import React from 'react';

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const InstagramAuth = ({ clientId, onAuthorization, btnText }) => {
  const redirectUri = 'https://pruebaapifacebook.onrender.com/';
  const scope = 'user_profile,user_media';
  const responseType = 'code';

  const handleAuthClick = () => {
    const authWindow = window.open(
      `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`,
      '_blank',
      'width=600,height=600'
    );

    const checkWindowClosed = () => {
      if (authWindow.closed) {
        window.removeEventListener('beforeunload', checkWindowClosed);
        console.log('Ventana cerrada');
      } else {
        try {
          const authCode = getAuthCodeFromUrl(authWindow.location.href);
          if (authCode) {
            window.removeEventListener('beforeunload', checkWindowClosed);
            console.log('Código obtenido:', authCode);
            obtainAccessToken(authCode);
            authWindow.close();
          }
        } catch (error) {
          console.error('Error al obtener el código:', error);
        }
      }
    };

    window.addEventListener('beforeunload', checkWindowClosed);
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
