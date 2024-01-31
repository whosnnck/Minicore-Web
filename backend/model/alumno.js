const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  idBanner: {
    type: String,
    required: true,
    unique: true,
  },
  notasPorProgreso: {
    type: Map,
    of: Number,
  },
});

const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;
