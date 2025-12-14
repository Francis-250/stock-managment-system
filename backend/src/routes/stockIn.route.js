import express from "express";
import {
  createStockIn,
  getStockIns,
} from "../controllers/stockIn.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createStockIn);
router.get("/", verifyToken, getStockIns);

export default router;
