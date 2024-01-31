// AlumnoTable.js
import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const AlumnoTable = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [selectedIdBanner, setSelectedIdBanner] = useState('');
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await axios.get('/alumno/allAlumnos');
        setAlumnos(response.data.alumnos);
      } catch (error) {
        console.error('Error al obtener alumnos:', error);
      }
    };

    fetchAlumnos();
  }, []);

  const handleAlumnoSelect = async (idBanner) => {
    try {
      const response = await axios.get(`/nota/notas/${idBanner}`);
      setNotas(response.data);
      setSelectedIdBanner(idBanner);
    } catch (error) {
      console.error('Error al obtener notas del alumno:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Alumnos</h2>
      <select onChange={(e) => handleAlumnoSelect(e.target.value)}>
        <option value="">Seleccionar Alumno</option>
        {alumnos.map((alumno) => (
          <option key={alumno.idBanner} value={alumno.idBanner}>
            {alumno.nombre}
          </option>
        ))}
      </select>

      {selectedIdBanner && (
        <div>
          <h3>Notas de {selectedIdBanner}</h3>
          <table>
            <thead>
              <tr>
                <th>Progreso</th>
                <th>Nota</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota) => (
                <tr key={nota._id}>
                  <td>{nota.progreso}</td>
                  <td>{nota.nota}</td>
                  <td>{new Date(nota.fecha).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AlumnoTable;
