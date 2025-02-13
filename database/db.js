const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  connectTimeout: 60000,
  acquireTimeout: 60000,
  waitForConnections: true,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Verificar conexión inicial
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error de conexión a la base de datos:", err.message);
  } else {
    console.log("✅ Conectado a la base de datos MySQL correctamente.");
    connection.release();
  }
});

// Manejar errores del pool
pool.on('error', (err) => {
  console.error('Error en la conexión del pool de MySQL:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Se perdió la conexión con la base de datos.');
  } else if (err.code === 'ECONNRESET') {
    console.error('Se reinició la conexión con la base de datos.');
  }
});

module.exports = pool.promise();