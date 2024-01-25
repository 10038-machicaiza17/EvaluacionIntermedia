// En el archivo src/components/AssignEvaluationForm.js
import React, { useState, useEffect } from 'react';

const AssignEvaluationForm = ({ evaluations, onSubmit }) => {
  const [selectedEvaluation, setSelectedEvaluation] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [students, setStudents] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ evaluationId: selectedEvaluation, studentId: selectedStudent });
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/students')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al cargar estudiantes: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setStudents(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="form-group">
        <label>Evaluación:</label>
        <select
          value={selectedEvaluation}
          onChange={e => setSelectedEvaluation(e.target.value)}
          className="form-control"
        >
          <option value="" disabled>
            Selecciona una evaluación
          </option>
          {evaluations.map(evaluation => (
            <option key={evaluation.id} value={evaluation.id}>
              {evaluation.question}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Estudiante:</label>
        <select
          value={selectedStudent}
          onChange={e => setSelectedStudent(e.target.value)}
          className="form-control"
        >
          <option value="" disabled>
            Selecciona un estudiante
          </option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <br></br>
      <div className="text-center">
        <button type="submit" className="btn btn-primary item-c">
          Asignar Evaluación
        </button>
      </div>
    </form>
  );
};

export default AssignEvaluationForm;
