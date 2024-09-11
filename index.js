const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');
const path = require('path');

//console.log(process.env);

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

app.use(cors());

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
//auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//si no es ninguna de las rutas declarada anteriormente entra por aca
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Esuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})