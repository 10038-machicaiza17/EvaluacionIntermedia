// En el archivo src/components/CreateEvaluationForm.js
import React, { useState } from 'react';

const CreateEvaluationForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = index => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ question, options });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="form-group">
        <label>Pregunta:</label>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Opciones:</label>
        {options.map((option, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              value={option}
              onChange={e => handleOptionChange(index, e.target.value)}
              className="form-control"
            />
            {options.length > 2 && (
              <div className="input-group-append">
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="btn btn-outline-danger"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="text-center">
          <button type="button" onClick={addOption} className="btn btn-outline-primary">
            Agregar Opción
          </button>
        </div>
      </div>
      <br></br>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Crear Evaluación
        </button>
      </div>
      <br></br>
    </form>
  );
};

export default CreateEvaluationForm;
