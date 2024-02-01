import React, { useEffect } from 'react';

const InstagramAuth = ({ onAuthorization }) => {
  const clientId = '751902293045624';
  const clientSecret = '00a486c16ebc9243a199f671c0a7affe'; // Reemplaza con tu client_secret
  const redirectUri = 'https://pruebaapifacebook.onrender.com/';
  const scope = 'user_profile,user_media';
  const responseType = 'code';

  useEffect(() => {
    const handleAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `client_id=${clientId}&client_secret=${encodeURIComponent(
              clientSecret
            )}&grant_type=authorization_code&redirect_uri=${encodeURIComponent(
              redirectUri
            )}&code=${code}`,
          });

          if (response.ok) {
            const responseData = await response.json();

            // Ejecutar la función de retorno de llamada con el response
            onAuthorization(responseData);

            // Indicar al usuario que cierre la ventana manualmente
            alert('Proceso completado. Puedes cerrar esta ventana.');
          } else {
            console.error('Error al intercambiar el código por el token.');
          }
        } catch (error) {
          console.error('Error en la solicitud de acceso:', error);
        }
      }
    };

    // Llamada a la función para manejar el código de autorización
    handleAuthCallback();
  }, [clientId, clientSecret, redirectUri, onAuthorization]);

  const handleAuthClick = () => {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

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
