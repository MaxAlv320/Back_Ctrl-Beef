import express from "express";
import { login, register } from "../Controllers/user.controller.js";
import { generateAppToken, verifyAppToken } from "../Helpers/jwt.helper.js"; // Importa la función

const router = express.Router();

router.post("/register", verifyAppToken, register);
router.post("/login", verifyAppToken, login);

router.get("/generate-app-token", (req, res) => {
  try {
    const token = generateAppToken();
    res.json({ 
      success: true, 
      token: token,
      message: "Token de aplicación generado exitosamente"
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: "Error generando token" 
    });
  }
});

export default router;
