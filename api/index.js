const dotenv = require('dotenv');
dotenv.config(); // Cargar variables de entorno al inicio

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://farid:emerc0d@cluster0.sguno.mongodb.net/taskManager?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Importar las rutas
const tasksRoute = require('./routes/tasks');
app.use('/tasks', tasksRoute);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error('Error en el servidor:', err);
    res.status(500).send('Error interno del servidor');
});

// Iniciar el servidor
app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
});
