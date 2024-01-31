// WelcomePage.js
import React from 'react';
import AlumnoForm from './Alumnos';
import NotaForm from './Notas';
import AlumnoTable from './TablaAlumno';

const WelcomePage = () => {
  return (
    <div>
      <h1>UDLA Calculadora</h1>
      <div>
        <AlumnoForm />
        <NotaForm />
      </div>
      <AlumnoTable />
    </div>
  );
};

export default WelcomePage;
