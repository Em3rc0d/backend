const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('../models/Task'); // Asegúrate de que la ruta sea correcta

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://farid:emerc0d@cluster0.sguno.mongodb.net/taskManager?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Rutas
app.post('/', async (req, res) => {
    try {
        const newTask = new Task({ ...req.body });
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/:userId', async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.params.userId });
        res.send(tasks);
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).send('Tarea no encontrada');
        }
        res.send(updatedTask);
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).send('Tarea no encontrada');
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Exporta la función para que Vercel pueda usarla
module.exports = (req, res) => {
    app(req, res);
};
