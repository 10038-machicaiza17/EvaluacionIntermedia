// En el archivo src/components/ConnectionTest.js del frontend
import React, { useState, useEffect } from 'react';

const ConnectionTest = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Realiza la solicitud al backend al cargar el componente
    fetch('http://localhost:3001/api/test') // Ajusta la URL según el puerto del backend
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error al conectar con el backend:', error));
  }, []);

  return (
    <div>
      <h1>Conexión entre el backend y el frontend</h1>
      <p>{message}</p>
    </div>
  );
};

export default ConnectionTest;
