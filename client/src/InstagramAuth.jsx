import React from 'react';

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const InstagramAuth = ({clientId, onAuthorization, btnText }) => {
  const redirectUri = 'https://pruebaapifacebook.onrender.com/';
  const scope = 'user_profile,user_media';
  const responseType = 'code';

  const handleAuthClick = () => {
    // Abrir la ventana emergente
    const authWindow = window.open(
      `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`,
      '_blank',
      'width=600,height=600'
    );

    // Verificar si la ventana se cerró
    const checkWindowClosed = setInterval(async () => {
      if (authWindow.closed) {
        clearInterval(checkWindowClosed);
        console.log('Ventana cerrada');
      } else {
        try {
          // Intentar acceder al código desde la ventana emergente
          const authCode = authWindow.location.href.split('code=')[1];
          if (authCode) {
            clearInterval(checkWindowClosed);
            console.log('Código obtenido:', authCode);

            // Realizar la solicitud al backend para obtener el token con Fetch y await
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
                credentials: 'include', // Incluir el siguiente encabezado para enviar cookies y credenciales
              });

              const data = await response.json();

              // Ejecutar la función de retorno de llamada con el response
              onAuthorization(data);
            } catch (error) {
              console.error('Error al obtener el token:', error);
            }

            // Cerrar la ventana emergente después de obtener el código
            authWindow.close();
          }
        } catch (error) {
          // Si hay un error al intentar acceder al código, seguir verificando
        }
      }
    }, 1000);
  };

  return (
    <> 
      <button onClick={handleAuthClick}>{btnText}</button>
    </>
  );
};

export default InstagramAuth;
