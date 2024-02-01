import express from "express";
import cors from "cors";
import pg from "pg";
import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';

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

// Configura Passport para usar FacebookTokenStrategy
passport.use(new FacebookTokenStrategy({
  clientID: '881471950379451',
  clientSecret: 'e5a147b2a21c41395fe022d086374165',
}, (accessToken, refreshToken, profile, done) => {
  // Aquí puedes hacer algo con la información del perfil del usuario
  // Por ejemplo, puedes guardarlo en la base de datos
  return done(null, profile);
}));

// Configura Express para usar Passport
app.use(passport.initialize());

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.post('/auth/facebook/token',
  passport.authenticate('facebook-token', { session: false }),
  (req, res) => {
    // Si la autenticación fue exitosa, puedes responder con la información del usuario
    res.header('Access-Control-Allow-Credentials', 'true'); // Agrega este encabezado
    res.json(req.user);
  },
  (err, req, res, next) => {
    console.error('Error de autenticación de Facebook:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
);
  
// ...



app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
