import React, { useEffect } from 'react';
import axios from 'axios';

const InstagramAuth = () => {
  const clientId = '751902293045624'; // Reemplaza con tu ID de cliente de Instagram
  const clientSecret = '00a486c16ebc9243a199f671c0a7affe'; // Reemplaza con tu secreto de cliente de Instagram
  const redirectUri = 'https://pruebaapifacebook.onrender.com/'; // Reemplaza con tu URI de redirección
  const scope = 'user_profile,user_media';
  const responseType = 'code';

  useEffect(() => {
    // Función para obtener el token y user_id después de autorizar
    const fetchTokenAndUserId = async (code) => {
      try {
        const response = await axios.post('https://api.instagram.com/oauth/access_token', {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
          code: code,
        });

        // Aquí puedes acceder al token y al user_id desde la respuesta
        const { access_token, user_id } = response.data;

        console.log('Access Token:', access_token);
        console.log('User ID:', user_id);

        // Puedes almacenar el token y user_id en el estado o realizar otras acciones necesarias
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    };

    // Obtén el código de autorización de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // Si hay un código en la URL, obtén el token y user_id
    if (code) {
      fetchTokenAndUserId(code);
    }
  }, [clientId, clientSecret, redirectUri]);

  const handleAuthClick = () => {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

    // Redirigir al usuario a la URL de autorización de Instagram
    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Instagram Authorization</h1>
      <button onClick={handleAuthClick}>Authorize with Instagram</button>
    </div>
  );
};

export default InstagramAuth;
