import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import pg from "pg";

// Obtener el directorio actual del archivo (equivalente a __dirname en CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
// Configuración CORS
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: "GET", // Puedes ajustar según tus necesidades (GET, POST, etc.)
    allowedHeaders: ["Content-Type"],
  })
);

// Servir archivos estáticos desde la carpeta 'build' (resultado de la construcción de React)
app.use(express.static(path.join(__dirname, 'dist')));

// Otras rutas específicas de tu aplicación React si las tienes



app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
