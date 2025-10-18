import express from "express";
import { signup, login, googleLogin, forgotPassword, resetPassword } from "../controller/authController.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;

