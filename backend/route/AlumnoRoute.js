const { Router } = require('express');

const { crearAlumno } = require('../controllers/AlumnoController');
const {obtenerAlumnoPorBanner} = require('../controllers/AlumnoController')
const {obtenerTodosLosAlumnos} = require('../controllers/AlumnoController')

const router = Router();

router.post('/crear', crearAlumno);

router.get('/alumno/:idBanner', obtenerAlumnoPorBanner);
router.get('/allalumnos', obtenerTodosLosAlumnos)

module.exports = router;