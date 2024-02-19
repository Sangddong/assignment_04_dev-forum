import { Router } from "express";
import postController from "./post/post.controller";
import commentController from "./comment/comment.controller";
import authController from "./auth/auth.controller";
import postLikeController from "./postLike/postLike.controller";

const controllers = Router();

controllers.use("/", postController);
controllers.use("/:postId", commentController);
controllers.use("/", authController);
controllers.use("/likes", postLikeController);

export default controllers;