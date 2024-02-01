import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "./Home";
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function App() {
  const [privacyPolicyData, setPrivacyPolicyData] = useState(null);
  const [termsOfServiceData, setTermsOfServiceData] = useState(null);

  useEffect(() => {
    const fetchData = async (path, setData) => {
      try {
        const response = await fetch(`${URL}/${path}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Puedes incluir otros encabezados según sea necesario
          },
          credentials: "include", // Para enviar cookies al servidor
        });

        if (!response.ok) {
          throw new Error(`Error al obtener datos de ${path}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData("privacypolicy", setPrivacyPolicyData);
    fetchData("termsofservice", setTermsOfServiceData);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/privacypolicy"
          element={<PrivacyPolicy data={privacyPolicyData} />}
        />
        <Route
          path="/termsofservice"
          element={<TermsOfService data={termsOfServiceData} />}
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
