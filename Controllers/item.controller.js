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

/**export const getItemByName = async (req, res) => {
  try {
    const items = await Item.find({ name: req.params.name });
    if (items.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/

export const getItemByName = async (req, res) => {
  try {
    const items = await Item.find({ name: req.params.name });

    if (items.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**export const getItemByName = async (req, res) => {
  try {
    const items = await Item.find({ name: req.params.name });

    if (items.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Si solo hay uno, devuelve el objeto directamente
    if (items.length === 1) {
      return res.json(items[0]);
    }

    // Si hay varios, devuelve el array completo
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */

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

export const updateItemStock = async (req, res) => {
  try {
    const { amount } = req.body; // cantidad a aumentar (+) o disminuir (-)

    // Validación: debe ser un número
    if (typeof amount !== "number") {
      return res.status(400).json({ message: "El campo 'amount' debe ser un número" });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $inc: { stock: amount } }, // incrementa o decrementa stock
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item no encontrado" });
    }

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
    let { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Debes enviar al menos un item" });
    }

    const results = [];

    for (const { id, quantity } of items) {
      const item = await Item.findById(id);

      if (!item) {
        results.push({ id, status: "error", message: "Item not found" });
        continue;
      }

      if (item.stock < quantity) {
        results.push({ id, status: "error", message: "Not enough stock" });
        continue;
      }

      item.stock -= quantity; // descontamos la cantidad seleccionada
      await item.save();

      results.push({ id, status: "success", message: `Purchased ${quantity}`, item });
    }

    res.json({ results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



