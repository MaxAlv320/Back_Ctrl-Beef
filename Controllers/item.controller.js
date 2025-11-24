import { Item } from "../Models/item.model.js";

// GET /items → Listar todo
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /items/:id → Obtener uno
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /items → Crear (admin)
export const createItem = async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;

    const newItem = new Item({ name, price, stock, description });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /items/:id → Actualizar (admin)
export const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /items/:id → Eliminar (admin)
export const deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /items/:id/buy → Reducir stock
export const buyItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.stock <= 0)
      return res.status(400).json({ message: "Out of stock" });

    item.stock -= 1;
    await item.save();

    res.json({ message: "Purchase successful", item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



