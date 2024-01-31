const Alumno = require('../model/alumno');

exports.crearAlumno = async (req, res) => {
  try {
    const { nombre, idBanner } = req.body;

    const alumnoExistente = await Alumno.findOne({ idBanner });
    if (alumnoExistente) {
      return res.status(400).json({ error: 'El idBanner ya está registrado.' });
    }

    const nuevoAlumno = new Alumno({ nombre, idBanner });

    await nuevoAlumno.save();

    res.status(201).json({ alumno: nuevoAlumno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el alumno.' });
  }
};

exports.obtenerAlumnoPorBanner = async (req, res) => {
    try {
      const { idBanner } = req.params;
  
      const alumno = await Alumno.findOne({ idBanner });
  
      if (!alumno) {
        return res.status(404).json({ error: 'Alumno no encontrado.' });
      }
  
      res.status(200).json({ alumno });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el alumno por idBanner.' });
    }
  };

exports.obtenerTodosLosAlumnos = async (req, res) => {
    try {
        const alumnos = await Alumno.find();

        if (!alumnos || alumnos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron alumnos.' });
        }

        res.status(200).json({ alumnos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener todos los alumnos.' });
    }
};
