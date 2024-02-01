import express from "express";
import cors from "cors";
import path from "path";
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

// Configurar cors para permitir solicitudes desde FRONTEND_URL
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Servir archivos estáticos desde la carpeta 'build' (resultado de la construcción de React)
app.use(express.static(path.join(__dirname, 'build')));

// Configuración de las rutas de tu aplicación React
app.get("/*", (req, res) => {
  // Responder con el contenido del archivo HTML principal de React
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
