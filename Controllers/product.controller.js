import { Product } from "../Models/product.model.js";

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear producto (1 solo)
export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, image, available } = req.body;

    // Ahora image ya es requerido
    if (!name || !category || !price || !image) {
      return res.status(400).json({ message: "Campos requeridos faltantes" });
    }

    const newProduct = await Product.create({
      name,
      description,
      category,
      price,
      image,
      available
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear múltiples productos
export const createManyProducts = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        message: "Se requiere un array de productos"
      });
    }

    // Validar que cada producto tenga image
    for (const p of req.body) {
      if (!p.name || !p.category || !p.price || !p.image) {
        return res.status(400).json({
          message: "Cada producto debe tener name, category, price e image"
        });
      }
    }

    const products = await Product.insertMany(req.body);

    res.status(201).json({
      message: "Productos creados correctamente",
      products
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear productos",
      error: error.message
    });
  }
};
