import React, { useEffect } from 'react';
import axios from 'axios';

const InstagramAuth = ({ onAuthorization }) => {
  const clientId = '751902293045624';
  const clientSecret = '00a486c16ebc9243a199f671c0a7affe';
  const redirectUri = 'https://pruebaapifacebook.onrender.com/';
  const scope = 'user_profile,user_media';
  const responseType = 'code';

  useEffect(() => {
    const fetchTokenAndUserId = async (code) => {
      try {
        const response = await axios.post('https://api.instagram.com/oauth/access_token', {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
          code: code,
        });

        const { access_token, user_id } = response.data;

        // Emitir el response a través de la función de retorno de llamada
        onAuthorization({ access_token, user_id });
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchTokenAndUserId(code);
    }
  }, [clientId, clientSecret, redirectUri, onAuthorization]);

  const handleAuthClick = () => {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

    const authWindow = window.open(authUrl, '_blank', 'width=600,height=600');

    const intervalId = setInterval(() => {
      try {
        if (authWindow.location.href.includes(`${redirectUri}?code=`)) {
          const code = new URLSearchParams(authWindow.location.search).get('code');

          authWindow.close();

          if (code) {
            fetchTokenAndUserId(code);
          }

          clearInterval(intervalId);
        }
      } catch (error) {
        console.error('Error al acceder a la ubicación de la ventana emergente:', error);
      }
    }, 1000);
  };

  return (
    <div>
      <h1>Instagram Authorization</h1>
      <button onClick={handleAuthClick}>Authorize with Instagram</button>
    </div>
  );
};

export default InstagramAuth;
