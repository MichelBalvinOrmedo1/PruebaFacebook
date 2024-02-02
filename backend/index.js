import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import pg from "pg";
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);

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

// Configurar CORS
app.use(cors({
  origin: FRONTEND_URL, // Actualiza FRONTEND_URL con tu frontend en producción
  credentials: true,
}));

app.use(express.json());  // Agregado para analizar el cuerpo JSON de las solicitudes

const pool = new pg.Pool({
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Middleware para manejar las solicitudes OPTIONS
app.options('*', cors());

app.post('/getAccessToken', async (req, res) => {
  const { clientId, redirectUri, code } = req.body;

  try {
    console.log('Received request with clientId:', clientId);
    console.log('Received request with redirectUri:', redirectUri);
    console.log('Received request with code:', code);

    const response = await axios.post(
      'https://api.instagram.com/oauth/access_token',
      // Enviar los parámetros en el cuerpo de la solicitud
      `client_id=${clientId}&client_secret=00a486c16ebc9243a199f671c0a7affe&grant_type=authorization_code&redirect_uri=${redirectUri}&code=${code}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const responseData = response.data;
    console.log('Instagram API response:', responseData);

    res.json(responseData);
  } catch (error) {
    console.error('Error al obtener el token:', error);

    // Enviar un mensaje de error específico al cliente
    res.status(500).json({ error: 'Error al obtener el token', details: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
