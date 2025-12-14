import express from "express";
import {
  lowStockReport,
  stockMovementReport,
} from "../controllers/report.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/low-stock", verifyToken, lowStockReport);
router.get("/", verifyToken, stockMovementReport);

export default router;
