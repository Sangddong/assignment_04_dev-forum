import { Request, Response } from "express";
import postLikeModel from "./postLike.model";

class PostLikeService {
    async likePost(req: Request, res: Response) {
        const postId = Number(req.params.postId);
        const userId = Number(req.params.userId);
        const likePosts = await postLikeModel.likePost(postId, userId);

        res.json(likePosts);
    }
    async getLikedPosts(req: Request, res: Response) {
        const userId = Number(req.params.userId);
        const getLikedPosts = await postLikeModel.getLikedPosts(userId);

        res.json(getLikedPosts);
    }
    async deleteLikedPost(req: Request, res: Response) {
        const postId = Number(req.params.postId);
        const userId = Number(req.params.userId);
        const deleteLikedPost = await postLikeModel.deleteLikedPost(postId, userId);

        res.json(deleteLikedPost);
    }
}

const postLikeService = new PostLikeService();

export default postLikeService;