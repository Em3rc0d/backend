const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Imprimir la variable de entorno
console.log('MONGODB_URI:', process.env.MONGODB_URI);

