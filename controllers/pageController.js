const pool = require('../database/db');

const vistaPrincipal = (req, res) => {
  res.render("index");
};

const guardarFormulario = async (req, res) => {
  try {
    const { callId, agent, tipoLlamada, genero, identificacion, numeroIdentificacion, nombre, extension, campana, tipo, motivo, submotivo, observaciones } = req.body || {};
    const valores = [
      callId, agent, tipoLlamada, genero, identificacion,
      numeroIdentificacion, nombre, extension, campana,
      tipo, motivo, submotivo, observaciones
    ].map(value => value === undefined ? null : value);

    const query = `
      INSERT INTO gestion_llamadas (call_id, agent, tipo_llamada, genero, tipo_identificacion, identificacion, nombre_apellidos, extension, campana, tipo, motivo, submotivo, observaciones, fecha_atencion)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    await pool.execute(query, valores);
    res.redirect('/');
  } catch (error) {
    console.error('Error al guardar el formulario:', error);
    res.redirect('/');
  }
};

module.exports = { vistaPrincipal, guardarFormulario };
