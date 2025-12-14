import express from "express";
import { getStock } from "../controllers/stock.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getStock);

export default router;
