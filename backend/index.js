import express from "express";
import cors from "cors";
import pg from "pg";

import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  FRONTEND_URL,
  PORT,
} from "./config.js";

const app = express();
const pool = new pg.Pool({
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Servir archivos estáticos desde la carpeta 'build' (resultado de la construcción de React)
app.use(express.static(path.join(__dirname, 'build')));

// Configuración de las rutas de tu aplicación React
app.get("/privacypolicy", (req, res) => {
  // Responder con el contenido de la ruta /privacypolicy de React
  res.sendFile(path.join(__dirname, 'build', 'PrivacyPolicy.html'));
});

app.get("/termsofservice", (req, res) => {
  // Responder con el contenido de la ruta /termsofservice de React
  res.sendFile(path.join(__dirname, 'build', 'TermsOfService.html'));
});

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
