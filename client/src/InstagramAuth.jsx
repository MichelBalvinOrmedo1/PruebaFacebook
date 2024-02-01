import React, { useEffect } from 'react';
import axios from 'axios';

const InstagramAuth = ({ onAuthorization }) => {
  const clientId = '751902293045624';
  const clientSecret = '00a486c16ebc9243a199f671c0a7affe';
  const redirectUri = 'https://pruebaapifacebook.onrender.com/';
  const scope = 'user_profile,user_media';
  const responseType = 'code';

  useEffect(() => {
    const handleWindowMessage = (event) => {
      // Verificar que el mensaje proviene de la ventana de Instagram
      if (event.origin === 'https://api.instagram.com') {
        const { access_token, user_id } = event.data;
        
        // Ejecutar la función de retorno de llamada con el response
        onAuthorization({ access_token, user_id });
        
        // Opcional: Cerrar la ventana emergente después de recibir el response
        window.close();
      }
    };

    window.addEventListener('message', handleWindowMessage);

    return () => {
      window.removeEventListener('message', handleWindowMessage);
    };
  }, [onAuthorization]);

  const handleAuthClick = () => {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

    // Abrir la ventana emergente
    const authWindow = window.open(authUrl, '_blank', 'width=600,height=600');

    // Verificar si la ventana emergente se cerró
    const checkWindowClosed = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(checkWindowClosed);
        // La ventana emergente se cerró, ejecutar alguna lógica adicional si es necesario
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
