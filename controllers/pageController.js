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
    res.redirect(`/?callerid=${callId}`);
  } catch (error) {
    console.error('Error al guardar el formulario:', error);
    res.redirect('/');
  }
};

const obtenerDatosPorIdentificacion = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.params;
    const { nombre = "", genero = "" } = req.body; // Recibir datos del formulario

    if (!numeroIdentificacion || numeroIdentificacion === "999") {
      return res.json({ nombre: "", genero: "" }); // Si no hay identificación válida, devolver vacío
    }

    // Buscar contacto en la tabla "contactos"
    const query = `SELECT Nombres AS nombre, Genero AS genero FROM contactos WHERE Identificacion = ? LIMIT 1`;
    const [rows] = await pool.execute(query, [numeroIdentificacion]);

    if (rows.length === 0) {
      // Insertar contacto si no existe
      const insertQuery = `INSERT INTO contactos (Identificacion, Nombres, Genero) VALUES (?, ?, ?)`;
      await pool.execute(insertQuery, [numeroIdentificacion, nombre, genero]);

      // Devolver los datos recién insertados
      return res.json({ nombre, genero });
    }
    return res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = { vistaPrincipal, guardarFormulario, obtenerDatosPorIdentificacion };
