import { Router } from "express";
import postLikeService from "./postLike.service";
import authenticator from "../../middlewares/authenticator.middleware";

const postLikeController = Router();

postLikeController.get("/:userId", authenticator, postLikeService.getLikedPosts);

postLikeController.post("/", authenticator, postLikeService.likePost);

postLikeController.delete("/", authenticator, postLikeService.deleteLikedPost);

export default postLikeController;