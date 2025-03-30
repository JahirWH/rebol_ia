// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Anthropic } from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Middlewares
app.use(cors({
  origin: 'http://localhost:4321'  // URL de tu frontend Astro
}));
app.use(express.json());

// Middleware de autenticación
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'API key no válida' });
  }
};

// Ruta de IA
app.post('/api/ia', apiKeyAuth, async (req, res) => {
  try {
    const { pregunta } = req.body;
    
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0.7,
      system: "Eres un experto en botánica llamado Rebol-IA. Responde preguntas sobre plantas y mini biomas.",
      messages: [{ role: "user", content: pregunta }]
    });
    
    res.json({ respuesta: response.content[0].text });
  } catch (error) {
    console.error('Error con Claude:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});