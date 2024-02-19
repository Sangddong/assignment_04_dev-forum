import { Router } from "express";
import postService from "./post.service";
import authenticator from "../../middlewares/authenticator.middleware";

const postController = Router();

//R
postController.get("/", postService.getAllPosts);
postController.get("/frontend", postService.getFrontendPosts);
postController.get("/backend", postService.getBackendPosts);
postController.get("/frontend/:postId", postService.getPost);
postController.get("/backend/:postId", postService.getPost);
postController.get("/:postId", postService.getPost);
//C
postController.post("/frontend", authenticator, postService.createPost);
postController.post("/backend", authenticator, postService.createPost);
//U
postController.put("/frontend/:postId", authenticator, postService.updatePost);
postController.put("/backend/:postId", authenticator, postService.updatePost);
//D
postController.delete("/:postId", authenticator, postService.deletePost);
postController.delete("/:postId", authenticator, postService.deletePost);

export default postController;