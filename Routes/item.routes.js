import express from "express";
import {
  getItems,
  getItemById,
  getItemByName,
  createItem,
  updateItemStock,
  updateItem,
  deleteItem,
  buyItem
} from "../Controllers/item.controller.js";
import { verifyAdmin, verifyAppToken, verifyUserToken } from "../Helpers/jwt.helper.js";

const router = express.Router();

// /api/items
router.get("/", verifyAppToken, verifyUserToken, getItems);
router.get("/:id", verifyAppToken, verifyUserToken, getItemById); 
router.get("/name/:name", verifyAppToken, verifyUserToken, getItemByName);

// Admin
router.post("/", verifyAppToken, verifyAdmin, verifyUserToken, createItem);
router.put("/:id", verifyAppToken, verifyAdmin, verifyUserToken, updateItem);
router.delete("/:id", verifyAppToken, verifyAdmin, verifyUserToken, deleteItem);
router.patch("/:id/stock", verifyAppToken, verifyUserToken, verifyAdmin, updateItemStock);

// Compra
router.post("/buy", verifyAppToken, verifyUserToken, buyItem);

export default router;


