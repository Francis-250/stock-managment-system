import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post("/", verifyToken, upload.single("image"), createProduct);
router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getProductById);
router.put("/:id", verifyToken, upload.single("image"), updateProduct);
router.delete("/:id", verifyToken, deleteProduct);
export default router;
