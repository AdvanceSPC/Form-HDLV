const express = require('express');
const router = express.Router();
const { vistaPrincipal, guardarFormulario, obtenerDatosPorIdentificacion } = require('../controllers/pageController');

router.get('/', vistaPrincipal);
router.post('/guardar', guardarFormulario);
router.get('/obtenerDatos/:numeroIdentificacion', obtenerDatosPorIdentificacion);

module.exports = router;
