const { Router } = require('express');

const { agregarNota } = require('../controllers/NotasController');
const { obtenerInformacionNotas } = require('../controllers/NotasController');
const { notasPorEstudiante } = require('../controllers/NotasController');
const {calcularNotasFinales} = require('../controllers/NotasController');

const router = Router();

router.post('/agregarnota', agregarNota);
router.get('/obtenernota', obtenerInformacionNotas);
router.get('/notas/:idBanner', notasPorEstudiante);
router.get('/obtenernotas/:idBanner', calcularNotasFinales)

module.exports = router;