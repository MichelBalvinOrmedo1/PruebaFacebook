import React from 'react';

const InstagramAuth = () => {
  const clientId = '751902293045624'; // Reemplaza con tu ID de cliente de Instagram
  const redirectUri = 'https://pruebaapifacebook.onrender.com/'; // Reemplaza con tu URI de redirección
  const scope = 'user_profile,user_media';
  const responseType = 'code';

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
