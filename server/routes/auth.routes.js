import express from "express";
import { resetPassword, sendPasswordResetMail, signin, signup } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/sign-in', signin);
router.post('/forgot-password', sendPasswordResetMail);
router.post('/reset-password/:token', resetPassword);

export default router;