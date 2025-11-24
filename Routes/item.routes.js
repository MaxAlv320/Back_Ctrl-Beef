import express from "express";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  buyItem
} from "../Controllers/item.controller.js";

const router = express.Router();

// /api/items
router.get("/", getItems);
router.get("/:id", getItemById);

// Admin
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

// Compra
router.post("/:id/buy", buyItem);

export default router;


