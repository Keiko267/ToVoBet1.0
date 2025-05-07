const express = require("express");
const router = express.Router();
const authService = require("../sevices/auth");

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Llama al servicio que gestiona la autenticación
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    console.error("Error en login:", err.message);
    next(err);
  }
});

module.exports = router;
