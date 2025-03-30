export async function consultarIA(pregunta) {
  try {
    const response = await fetch('http://localhost:3000/api/ia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pregunta })
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.respuesta;
    
  } catch (error) {
    console.error('Error al consultar la IA:', error);
    throw error;
  }
}