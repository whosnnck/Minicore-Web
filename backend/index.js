const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')


//Importando Controladores
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/minicore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Middleware para analizar solicitudes JSON
app.use(express.json());
app.use(cors());

//Rutas
//Agregar las rutas del servidor
app.use('/api/alumno', require('./route/AlumnoRoute') );

app.use('/api/nota', require('./route/NotaRoute'));



//Coneccion al servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('DB Conectado y funcionando en el puerto ',PORT);
})