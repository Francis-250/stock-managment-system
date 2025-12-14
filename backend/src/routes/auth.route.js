import express from "express";
import {
  ActivateAccount,
  ChangePassword,
  DisableAccount,
  login,
  logout,
  register,
  ResetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.patch("/activate-account/:id", ActivateAccount);
router.patch("/disable-account/:id", DisableAccount);
router.post("/reset-password", ResetPassword);
router.put("/change-password", ChangePassword);
router.post("/logout", logout);

export default router;
