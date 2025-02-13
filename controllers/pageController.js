const pool = require('../database/db');

const vistaPrincipal = (req, res) => {
  res.render("index");
};

const guardarFormulario = async (req, res) => {
  try {
    const { 
      callId, 
      agent = "",
      tipoLlamada, 
      genero, 
      identificacion, 
      numeroIdentificacion, 
      nombre, 
      extension, 
      campana, 
      tipo, 
      motivo, 
      submotivo, 
      observaciones 
    } = req.body || {};

    const valores = [
      callId, agent, tipoLlamada, genero, identificacion,
      numeroIdentificacion, nombre, extension, campana,
      tipo, motivo, submotivo, observaciones
    ];

    const query = `
      INSERT INTO gestion_llamadas (call_id, agent, tipo_llamada, genero, tipo_identificacion, 
        identificacion, nombre_apellidos, extension, campana, tipo, motivo, submotivo, 
        observaciones, fecha_atencion)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    await pool.execute(query, valores);

    // Redirigir manteniendo el callerid en la URL
    res.redirect(`/?callerid=${callId}`);
  } catch (error) {
    console.error('Error al guardar el formulario:', error);
    res.redirect('/');
  }
};

const obtenerDatosPorIdentificacion = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.params;

    if (!numeroIdentificacion || numeroIdentificacion === "999") {
      return res.status(400).json({ error: "Identificación no válida" });
    }

    const query = `SELECT nombre_apellidos AS nombre, genero FROM gestion_llamadas WHERE identificacion = ? LIMIT 1`;
    const [rows] = await pool.execute(query, [numeroIdentificacion]);

    if (rows.length > 0) {
      return res.json(rows[0]);
    } else {
      return res.json({ nombre: "", genero: "" }); // Retornar datos vacíos en lugar de error 404
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = { vistaPrincipal, guardarFormulario, obtenerDatosPorIdentificacion };
