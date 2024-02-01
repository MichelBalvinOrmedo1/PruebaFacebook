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

        // Almacenar el response en localStorage
        localStorage.setItem('instagramAuthResponse', JSON.stringify({ access_token, user_id }));

        // Cerrar la ventana emergente
        window.close();
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchTokenAndUserId(code);
    }
  }, [clientId, clientSecret, redirectUri]);

  const handleAuthClick = () => {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

    const authWindow = window.open(authUrl, '_blank', 'width=600,height=600');

    // Verificar si la ventana principal está disponible
    const checkMainWindow = setInterval(() => {
      if (window.opener && !window.opener.closed) {
        try {
          // Obtener el response almacenado en localStorage
          const storedResponse = localStorage.getItem('instagramAuthResponse');
          if (storedResponse) {
            const response = JSON.parse(storedResponse);

            // Limpiar el localStorage
            localStorage.removeItem('instagramAuthResponse');

            // Ejecutar la función de retorno de llamada con el response
            onAuthorization(response);

            // Limpiar el intervalo
            clearInterval(checkMainWindow);

            // Cerrar la ventana emergente
            authWindow.close();
          }
        } catch (error) {
          console.error('Error al acceder al localStorage:', error);
        }
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
