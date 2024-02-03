// NotaForm.js
import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const NotaForm = () => {
    const [nota, setNota] = useState('');
    const [progreso, setProgreso] = useState('1');
    const [alumnos, setAlumnos] = useState([]); // Lista de alumnos
    const [selectedAlumno, setSelectedAlumno] = useState('');
    const [fecha, setFecha] = useState('');
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchAlumnos = async () => {
        try {
          const response = await axios.get('/alumno/allalumnos'); // Corrige la ruta según tu API
          setAlumnos(response.data.alumnos); // Asegúrate de ajustar la estructura de la respuesta según lo que devuelve tu servidor
        } catch (error) {
          console.error('Error al obtener la lista de alumnos:', error);
        }
      };
  
      fetchAlumnos();
    }, []);
  
    const handleNotaSubmit = async (e) => {
      e.preventDefault();
  
      // Validar la nota dentro del rango de 0 a 10
      if (isNaN(nota) || nota < 0 || nota > 10) {
        setError('La nota debe estar entre 0 y 10.');
        return;
      }
  
      try {
        await axios.post('/nota/agregarnota', { nota, progreso, idBanner: selectedAlumno, fecha });
  
        setError('');
        window.location.reload();
      } catch (error) {
        console.error('Error al agregar nota:', error);
        setError('Error al agregar la nota. Por favor, verifica los datos e intenta de nuevo.');
      }
    };

  return (
    <div>
      <h2>Agregar Nota</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleNotaSubmit}>
        <label>
          Nota (entre 0 y 10):
          <input
            type="number"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            min="0"
            max="10"
          />
        </label>
        <br />
        <label>
          Progreso:
          <select value={progreso} onChange={(e) => setProgreso(e.target.value)}>
            <option value="1">Progreso 1</option>
            <option value="2">Progreso 2</option>
          </select>
        </label>
        <br />
        <label>
          Alumno:
          <select value={selectedAlumno} onChange={(e) => setSelectedAlumno(e.target.value)}>
            <option value="">Seleccionar Alumno</option>
            {alumnos.map((alumno) => (
              <option key={alumno.idBanner} value={alumno.idBanner}>
                {alumno.nombre}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Fecha:
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </label>
        <br />
        <button type="submit">Agregar Nota</button>
      </form>
    </div>
  );
};

export default NotaForm;
