const Nota = require('../model/notas');
const Alumno = require('../model/alumno');

exports.agregarNota = async (req, res) => {
  try {
    const { nota, progreso, idBanner, fecha } = req.body;

    const fechaNota = new Date(fecha);

    const alumnoExistente = await Alumno.findOne({ idBanner });

    if (!alumnoExistente) {
      return res.status(404).json({ error: 'No se encontró el alumno con el ID proporcionado.' });
    }

    const limitesProgreso = {
      1: { inicio: new Date('2024-01-29'), fin: new Date('2024-02-04') },
      2: { inicio: new Date('2024-02-05'), fin: new Date('2024-02-11') },
      3: { inicio: new Date('2024-02-12'), fin: new Date('2024-02-18') },
    };

    if (
      fechaNota < limitesProgreso[progreso].inicio ||
      fechaNota > limitesProgreso[progreso].fin
    ) {
      return res.status(400).json({ error: 'La fecha de la nota está fuera del período permitido.' });
    }

    if (!alumnoExistente.notasPorProgreso) {
      alumnoExistente.notasPorProgreso = new Map();
    }
    
    const progresoStr = progreso.toString();
    if (!alumnoExistente.notasPorProgreso.has(progresoStr)) {
      alumnoExistente.notasPorProgreso.set(progresoStr, 0);
    }
    alumnoExistente.notasPorProgreso.set(progresoStr, alumnoExistente.notasPorProgreso.get(progresoStr) + 1);
    
    const notasPorProgresoObject = {};
      alumnoExistente.notasPorProgreso.forEach((value, key) => {
      notasPorProgresoObject[key] = value;
    });

    const progreso1 = alumnoExistente.notasPorProgreso.get('1');

    alumnoExistente.notasPorProgreso.set('1', progreso1 + 1)

    const nuevaNota = new Nota({ nota, progreso, idBanner: alumnoExistente.idBanner, fecha });
    
    await nuevaNota.save();
    await alumnoExistente.save();

    res.status(201).json({ nota: nuevaNota });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar la nota.' });
  }
};

exports.obtenerInformacionNotas = async (req, res) => {
  try {
    const informacionNotas = await Alumno.aggregate([
      {
        $project: {
          _id: 0,
          idBanner: '$idBanner',
          nombre: '$nombre',
          cantidadDeNotas:'$notasPorProgreso',
        },
      },
    ]);

    res.status(200).json({ informacionNotas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la información de las notas.' });
  }
};


exports.notasPorEstudiante = async (req, res) => {
  try {
    const alumno = await Alumno.findOne({ idBanner: req.params.idBanner });

    if (!alumno) {
      return res.status(404).json({ error: 'No se encontró el alumno con el ID proporcionado.' });
    }
    
    const nombre = alumno.nombre;

    const notas = await Nota.find({ idBanner: req.params.idBanner });

    const informacionNotas = [];

    for (const nota of notas) {
      const { progreso, fecha, nota: valorNota } = nota;

      informacionNotas.push({ progreso, fecha, valorNota });
    }

    res.json({ nombre, informacionNotas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la información de notas del estudiante.' });
  }
};

exports.calcularNotasFinales = async (req, res) => {
  try {
    const alumno = await Alumno.findOne({ idBanner: req.params.idBanner });

    if (!alumno) {
      return res.status(404).json({ error: 'No se encontró el alumno con el ID proporcionado.' });
    }

    const notas = await Nota.find({ idBanner: req.params.idBanner });

    const notasPorProgreso = {};

    notas.forEach(nota => {
      if (!notasPorProgreso[nota.progreso]) {
        notasPorProgreso[nota.progreso] = 1;
      } else {
        notasPorProgreso[nota.progreso]++;
      }
    });

    const porcentajesPorProgreso = {
      1: 25,
      2: 35
    };

    const promediosPorProgreso = {};

    let sumaNotas = 0;
    for (const progreso in notasPorProgreso) {
      const cantidadNotas = notasPorProgreso[progreso];
      const notasEnProgreso = notas.filter(nota => nota.progreso === parseInt(progreso));
      const sumaNotasProgreso = notasEnProgreso.reduce((total, nota) => total + nota.nota, 0);
  
      promediosPorProgreso[progreso] = sumaNotasProgreso / cantidadNotas;

      sumaNotas += sumaNotasProgreso;
    }

    const notaFinalP1 = parseFloat(promediosPorProgreso[1] * (porcentajesPorProgreso[1] / 100)).toFixed(2);
    const notaFinalP2 = parseFloat(promediosPorProgreso[2] * (porcentajesPorProgreso[2] / 100)).toFixed(2);
    
    //const notaFinalTotal = parseFloat((notaFinalP1 + notaFinalP2)).toFixed(2);
    const notaFinalTotal = parseFloat(notaFinalP1) + parseFloat(notaFinalP2);

    const resultadoFinal = parseFloat(6 - notaFinalTotal).toFixed(2);
    const notaNecesitada = parseFloat(resultadoFinal/0.4).toFixed(2);

    const resultados = {
      notaFinalP1,
      notaFinalP2,
      notaFinalTotal,
      notaNecesitada
    };

    res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al calcular las notas finales.' });
  }
};


