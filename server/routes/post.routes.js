import express from "express";
import { newpost } from "../controllers/post.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/new', protectRoute, newpost);

export default router;