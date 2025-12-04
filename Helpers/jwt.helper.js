import jwt from "jsonwebtoken";

// Genera token JWT de usuario (incluye role)
export const generateUserToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// Genera token JWT de la aplicación
export const generateAppToken = () => {
  return jwt.sign({ app: process.env.APP_NAME }, process.env.APP_SECRET, {
    expiresIn: "360d",
  });
};

// Verifica token de aplicación
export const verifyAppToken = (req, res, next) => {
  const token = req.headers["x-app-token"];

  if (!token) return res.status(401).json({ message: "App Token requerido" });

  try {
    jwt.verify(token, process.env.APP_SECRET);
    next();
  } catch (error) {
    return res.status(403).json({ message: "App Token inválido o expirado" });
  }
};

// Verifica token de usuario y guarda payload en req.user
export const verifyUserToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Token de usuario requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role, iat, exp }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

// Verifica que el usuario (ya en req.user) sea admin
export const verifyAdmin = (req, res, next) => {
  try {
    const user = req.user; // debe venir de verifyUserToken

    if (!user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    // Comprobación estricta: rol admin en token
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acceso denegado: Solo administradores" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al verificar administrador" });
  }
};
