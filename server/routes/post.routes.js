import express from "express";
import { deletePost, getPosts, getSinglePost, newpost } from "../controllers/post.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/new', protectRoute, newpost);
router.post('/posts', getPosts);
router.post('/:postId', protectRoute, getSinglePost);
router.delete('/post/:id', protectRoute, deletePost);

export default router;