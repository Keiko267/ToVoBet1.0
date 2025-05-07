const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_secreta";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No se proporcionó token de autorización" });
  }

  // Suponiendo que el token se envía como "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // Manejo específico para token expirado
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expirado" });
      }
      // Otros errores (token inválido, mal formado, etc.)
      return res.status(401).json({ message: "Token inválido" });
    }
    // Si el token es válido, se guarda la información decodificada en req.user
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
