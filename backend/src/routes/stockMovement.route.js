import express from "express";
import { getStockMovements } from "../controllers/stockMovement.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getStockMovements);

export default router;
