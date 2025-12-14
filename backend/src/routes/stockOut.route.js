import express from "express";
import {
  createStockOut,
  getStockOuts,
} from "../controllers/stockOut.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createStockOut);
router.get("/", verifyToken, getStockOuts);

export default router;
