import express from "express";
import {
  chartData,
  recentActivities,
  TotalItems,
} from "../controllers/stats.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, TotalItems);
router.get("/chart-data", verifyToken, chartData);
router.get("/recent-activities", verifyToken, recentActivities);

export default router;
