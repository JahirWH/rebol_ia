import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.use(cors());
app.use(express.json());

app.post('/api/ia', async (req, res) => {
  try {
    const { pregunta } = req.body;
    
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0.7,
      system: "Eres un experto en botánica y cuidado de plantas llamado Rebol-IA. Proporciona respuestas detalladas y prácticas sobre cultivo de plantas, mini biomas y terrarios. Sé amable y profesional.",
      messages: [
        {
          role: "user",
          content: pregunta
        }
      ]
    });

    res.json({
      respuesta: response.content[0].text
    });

  } catch (error) {
    console.error('Error al consultar Claude:', error);
    res.status(500).json({
      error: "Ocurrió un error al procesar tu pregunta"
    });
  }
});

app.get('/', (req, res) => {
  res.send('¡Servidor Rebol-IA activo! Usa POST /api/ia para interactuar con la IA.');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});