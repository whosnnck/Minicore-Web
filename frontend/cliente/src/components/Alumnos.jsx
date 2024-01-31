import React, { useState } from 'react';
import alumnostyle from '../styles/alumno.css';

const AlumnoForm = ({ onAlumnoSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [idBanner, setIdBanner] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/alumno/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, idBanner }),
    });

    const data = await response.json();

    if (response.ok) {
      setNombre('');
      setIdBanner('');
      setSuccessMessage('Alumno ingresado correctamente');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload();
      }, 1000);
    } else {
      console.error(data.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <br />
        <label>
          ID Banner:
          <input type="text" value={idBanner} onChange={(e) => setIdBanner(e.target.value)} />
        </label>
        <br />
        <button type="submit">Agregar Alumno</button>
      </form>
      {successMessage && <p className={alumnostyle.successMessage}>{successMessage}</p>}
    </div>
  );
};

export default AlumnoForm;
