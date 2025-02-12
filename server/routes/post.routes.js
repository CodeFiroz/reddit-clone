import express from "express";
import { deletePost, getPosts, newpost } from "../controllers/post.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/new', protectRoute, newpost);
router.get('/posts', getPosts);
router.delete('/post/:id', deletePost);

export default router;