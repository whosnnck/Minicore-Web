// AlumnoTable.js
import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const AlumnoTable = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [selectedIdBanner, setSelectedIdBanner] = useState('');
  const [notas, setNotas] = useState([]);
  const [notasFinales, setNotasFinales] = useState(null); // Nuevo estado para almacenar las notas finales

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
      const responseNotas = await axios.get(`/nota/notas/${idBanner}`);
      const responseNotasFinales = await axios.get(`/nota/obtenernotas/${idBanner}`);

      const notasDelAlumno = responseNotas.data.informacionNotas; // ajusta la propiedad según la estructura real de la respuesta
      const notasFinalesDelAlumno = responseNotasFinales.data;

      setNotas(notasDelAlumno);
      setNotasFinales(notasFinalesDelAlumno); // Almacena las notas finales en el estado
      setSelectedIdBanner(idBanner);
    } catch (error) {
      console.error('Error al obtener notas del alumno:', error);
      setNotas([]); // En caso de error, asignar un array vacío
      setNotasFinales(null);
    }
  };

  return (
    <div>
      <h2>Notas del Estudiante</h2>
      <label htmlFor="alumnoDropdown">Selecciona un alumno:</label>
      <select
        id="alumnoDropdown"
        value={selectedIdBanner}
        onChange={(e) => handleAlumnoSelect(e.target.value)}
      >
        <option value="">Selecciona un alumno</option>
        {alumnos.map((alumno) => (
          <option key={alumno.idBanner} value={alumno.idBanner}>
            {alumno.nombre} - {alumno.idBanner}
          </option>
        ))}
      </select>

      {selectedIdBanner && (
        <div>
          <h3>Notas de {alumnos.find((alumno) => alumno.idBanner === selectedIdBanner)?.nombre}</h3>
                    {notasFinales && (
            <div>
              <h3>Notas Finales</h3>
              <p>Nota Final P1: {parseFloat((notasFinales.notaFinalP1)/ 0.25).toFixed(2)}</p>
              <p>Nota Final P2: {parseFloat((notasFinales.notaFinalP2)/0.35).toFixed(2)}</p>
              <p>Nota Necesitada: {notasFinales.notaNecesitada}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlumnoTable;
