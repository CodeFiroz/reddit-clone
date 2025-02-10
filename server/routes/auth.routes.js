import express from "express";
import { checkAuth, logout, resetPassword, sendPasswordResetMail, signin, signup } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/sign-in', signin);
router.post('/forgot-password', sendPasswordResetMail);
router.post('/reset-password/:token', resetPassword);
router.post('/check-auth', protectRoute, checkAuth);
router.post('/logout', logout);

export default router;