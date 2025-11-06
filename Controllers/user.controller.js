import bcrypt from "bcryptjs";
import { User } from "../Models/user.model.js";
import { generateUserToken } from "../Helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed });
    const token = generateUserToken(newUser);
    
    res.status(201).json({ message: "User created", user: newUser, "token":token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateUserToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLogin = async (req, res) => {
  try {
    // Obtenemos el token del header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    // Verificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscamos al usuario por su ID (desde el token)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Enviamos los datos del usuario autenticado
    res.json({ message: "Authenticated user", user });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


