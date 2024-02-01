// PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  const [data, setData] = useState([]);
  return (
    <div>
      <h2>Política de Privacidad</h2>
      <p>
        Esta política de privacidad describe cómo recopilamos, utilizamos y compartimos la información cuando utilizas nuestra plataforma, que incluye el acceso y el uso de la API de Facebook.
      </p>

      <h3>1. Recopilación de Información</h3>
      <p>
        Recopilamos información limitada necesaria para proporcionar nuestros servicios, incluyendo datos de usuario obtenidos a través de la API de Facebook. La información recopilada puede incluir datos de perfil, preferencias y actividades en nuestra plataforma.
      </p>

      <h3>2. Uso de la Información</h3>
      <p>
        Utilizamos la información recopilada para ofrecer y mejorar nuestros servicios, personalizar la experiencia del usuario y garantizar el cumplimiento de nuestras políticas. No compartiremos ni venderemos información de usuario a terceros sin consentimiento explícito.
      </p>

      <h3>3. Acceso a la API de Facebook</h3>
      <p>
        Al utilizar la API de Facebook, aceptas que ciertos datos de usuario estarán sujetos a las políticas de privacidad y términos de servicio de Facebook. Seguimos las directrices de Facebook para desarrolladores y protegemos la información obtenida a través de la API.
      </p>

      <h3>4. Seguridad</h3>
      <p>
        Implementamos medidas de seguridad para proteger la información del usuario. Sin embargo, ten en cuenta que ninguna transmisión de datos por Internet o almacenamiento electrónico es completamente segura.
      </p>

      <h3>5. Cambios en la Política de Privacidad</h3>
      <p>
        Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Te notificaremos sobre cambios significativos en nuestra política de privacidad. Continuar utilizando nuestra plataforma después de dichos cambios constituye tu aceptación de la nueva política de privacidad.
      </p>

      <h3>6. Contacto</h3>
      <p>
        Si tienes alguna pregunta sobre nuestra política de privacidad, no dudes en ponerte en contacto con nosotros.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
