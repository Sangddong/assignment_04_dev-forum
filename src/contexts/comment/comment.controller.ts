import { Router } from "express";
import commentService from "./comment.service";
import authenticator from "../../middlewares/authenticator.middleware";

const commentController = Router();

//R
commentController.get("/comments", commentService.readComment)
commentController.get("/comments", commentService.readComment)
//C
commentController.post("/comment",  authenticator, commentService.createComment);
commentController.post("/comment", authenticator, commentService.createComment);
//U
commentController.put("/:commentId", authenticator, commentService.updateComment);
commentController.put("/:commentId", authenticator, commentService.updateComment);
//D
commentController.delete("/:commentId", authenticator, commentService.deleteComment);
commentController.delete("/:commentId", authenticator, commentService.deleteComment);

export default commentController;