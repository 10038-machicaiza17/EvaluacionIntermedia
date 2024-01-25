const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors()); // Habilita CORS para todas las rutas

const evaluationsFilePath = path.join(__dirname, 'evaluations.json');
const studentsFilePath = path.join(__dirname, 'students.json');
const assignmentsFilePath = path.join(__dirname, 'assignments.json');

// Ruta para crear evaluaciones
app.post('/api/evaluations', async (req, res) => {
  try {
    const { question, options } = req.body;

    // Cargar evaluaciones existentes desde el archivo JSON
    const existingEvaluations = await fs.readFile(evaluationsFilePath, 'utf8');
    const evaluations = existingEvaluations ? JSON.parse(existingEvaluations) : [];

    // Agregar nueva evaluación
    const newEvaluation = { question, options };
    evaluations.push(newEvaluation);

    // Guardar las evaluaciones actualizadas en el archivo JSON
    await fs.writeFile(evaluationsFilePath, JSON.stringify(evaluations, null, 2), 'utf8');

    res.json({ success: true, message: 'Evaluación creada con éxito' });
  } catch (error) {
    console.error('Error al guardar la evaluación:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

app.get('/api/evaluations', async (req, res) => {
    try {
      const existingEvaluations = await fs.readFile(evaluationsFilePath, 'utf8');
      const evaluations = existingEvaluations ? JSON.parse(existingEvaluations) : [];
      res.json(evaluations);
    } catch (error) {
      console.error('Error al cargar las evaluaciones:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  });

// Ruta para obtener estudiantes
app.get('/api/students', async (req, res) => {
    try {
      const existingStudents = await fs.readFile(studentsFilePath, 'utf8');
      const students = existingStudents ? JSON.parse(existingStudents) : [];
      res.json(students);
    } catch (error) {
      console.error('Error al cargar los estudiantes:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  });
  
  // Ruta para asignar evaluaciones a estudiantes
  app.post('/api/assignEvaluation', async (req, res) => {
    try {
      const { evaluationId, studentId } = req.body;
  
      // Cargar asignaciones existentes desde el archivo JSON
      const existingAssignments = await fs.readFile(assignmentsFilePath, 'utf8');
      const assignments = existingAssignments ? JSON.parse(existingAssignments) : [];
  
      // Agregar nueva asignación
      const newAssignment = { evaluationId, studentId };
      assignments.push(newAssignment);
  
      // Guardar las asignaciones actualizadas en el archivo JSON
      await fs.writeFile(assignmentsFilePath, JSON.stringify(assignments, null, 2), 'utf8');
  
      res.json({ success: true, message: 'Evaluación asignada con éxito' });
    } catch (error) {
      console.error('Error al asignar la evaluación al estudiante:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
