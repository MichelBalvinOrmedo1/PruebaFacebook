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
const pool = new pg.Pool({
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Configurar CORS
app.use(cors({ origin: 'https://pruebaapifacebook.onrender.com', credentials: true }));


app.post('/getAccessToken', async (req, res) => {
  const { clientId, redirectUri, code } = req.body;

  try {
    const response = await axios.post('https://api.instagram.com/oauth/access_token', {
      client_id: clientId,
      client_secret: '00a486c16ebc9243a199f671c0a7affe', // Reemplaza con tu client_secret
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code: code,
    });

    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error('Error al obtener el token:', error);
    res.status(500).json({ error: 'Error al obtener el token' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
