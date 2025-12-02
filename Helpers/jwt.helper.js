import jwt from "jsonwebtoken";

// Genera token JWT de usuario
export const generateUserToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// Genera token JWT de la aplicación
export const generateAppToken = () => {
  return jwt.sign(
    { app: process.env.APP_NAME },
    process.env.APP_SECRET,
    { expiresIn: "360d"}
  );
};

// Verifica token de aplicación
export const verifyAppToken = (req, res, next) => {
  const token = req.headers["x-app-token"];

  if (!token) return res.status(401).json({ message: "App Token requerido" });

  try {
    jwt.verify(token, process.env.APP_SECRET);
    next();
  } catch (error) {
    res.status(403).json({ message: "App Token inválido o expirado" });
  }
};



