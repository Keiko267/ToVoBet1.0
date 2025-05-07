const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

// Se recomienda definir la clave secreta en el .env (por ejemplo, JWT_SECRET=mi_clave_secreta)
// Para simplificar, se usa una constante; en producción, accede a process.env.JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;

async function login(email, password) {
  // Buscar usuario por email
  const query = "SELECT * FROM sys_users WHERE user_email = ?";
  const users = await db.query(query, [email]);

  if (!users || users.length === 0) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 401;
    throw error;
  }

  const user = users[0];

  const isMatch = await bcrypt.compare(password, user.user_password);
  if (!isMatch) {
    const error = new Error("Contraseña incorrecta");
    error.statusCode = 401;
    throw error;
  }

  // Generar el token JWT (por ejemplo, con expiración de 1 hora)
  const token = jwt.sign(
    { id: user.id, email: user.user_email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Devuelve la información necesaria
  return {
    token,
    user: {
      id: user.id,
      email: user.user_email,
    },
  };
}

module.exports = { login };
