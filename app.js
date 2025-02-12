const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

// Configuración de variables de entorno
dotenv.config({ path: './env/.env' });
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
// Cargar rutas
const routes = require('./routes/routes');
app.use('/', routes);

app.listen(3000, () => {
  console.log('SERVER UP running in http://localhost:3000');
});
