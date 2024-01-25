// En el archivo src/App.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa las hojas de estilo de Bootstrap
import CreateEvaluationForm from './components/CreateEvaluationForm';
import AssignEvaluationForm from './components/AssignEvaluationForm';

const App = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [students, setStudents] = useState([]);

  const handleCreateEvaluation = async data => {
    try {
      const response = await fetch('http://localhost:3001/api/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Respuesta del backend:', result);
        // Recargar la lista de evaluaciones después de crear una nueva
        loadEvaluations();
      } else {
        console.error('Error al enviar la evaluación al backend:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red al enviar la evaluación al backend:', error);
    }
  };

  const handleAssignEvaluation = async data => {
    try {
      const response = await fetch('http://localhost:3001/api/assignEvaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'cors', // Agrega esta línea para especificar el modo CORS
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Respuesta del backend:', result);
      } else {
        console.error('Error al asignar la evaluación al estudiante:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red al asignar la evaluación al estudiante:', error);
    }
  };

  const loadEvaluations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/evaluations');
      if (response.ok) {
        const result = await response.json();
        setEvaluations(result);
      } else {
        console.error('Error al cargar las evaluaciones:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red al cargar las evaluaciones:', error);
    }
  };

  const loadStudents = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/students');
      if (response.ok) {
        const result = await response.json();
        setStudents(result);
      } else {
        console.error('Error al cargar los estudiantes:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red al cargar los estudiantes:', error);
    }
  };

  // Cargar evaluaciones y estudiantes cuando se monta el componente
  useEffect(() => {
    loadEvaluations();
    loadStudents();
  }, []);  // El segundo argumento es un array de dependencias, en este caso, un array vacío


  return (
    <div>
      <h1 class="text-center">Sistema de Evaluación</h1>
      <h2 class="text-center">Formulario de Preguntas</h2>
      <CreateEvaluationForm onSubmit={handleCreateEvaluation} />
      <h2 class="text-center">Formulario de Asignacion de preguntas</h2>
      <AssignEvaluationForm evaluations={evaluations} students={students} onSubmit={handleAssignEvaluation} />
    </div>
  );
};

export default App;
