const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
  nota: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  progreso: {
    type: Number,
    required: true
  },
  idBanner: {
    type: String,
    required: true,
  },
});

const Nota = mongoose.model('Nota', notaSchema);

module.exports = Nota;
