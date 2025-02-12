const express = require('express');
const router = express.Router();
const { vistaPrincipal, guardarFormulario } = require('../controllers/pageController');

router.get('/', vistaPrincipal);
router.post('/guardar', guardarFormulario);

module.exports = router;
