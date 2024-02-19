import { Request, Response } from "express";
import postModel from "./post.model";

class PostService {
    async createPost(req: Request, res: Response) {
        const { title, content } = req.body;
        const category = req.path.includes('/frontend') ? 'frontend' : 'backend';
        const userId = req.user?.id;

        if (!userId) return res.status(401).json({ message: "로그인해주세요!" });
        if (!title) return res.status(400).json({ message: "제목을 입력해주세요!" });
        if (!content) return res.status(400).json({ message: "내용을 입력해주세요!" });

        const response = await postModel.create({
            category, userId: Number(userId), title, content
        })

        res.json(response);
    }

    async getAllPosts(req: Request, res: Response) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const frontendPosts = await postModel.findPagedFrontendPosts(page, limit);
        const backendPosts = await postModel.findPagedBackendPosts(page, limit);

        res.json([frontendPosts, backendPosts]);
    }

    async getFrontendPosts(req: Request, res: Response) {
        const response = await postModel.findFrontendPosts();
        res.json(response);
    }

    async getBackendPosts(req: Request, res: Response) {
        const response = await postModel.findBackendPosts();
        res.json(response);
    }

    async getPost(req: Request, res: Response) {
        const postId = Number(req.params.postId);
        const response = await postModel.findOne(postId);
        res.json(response);
    }

    async updatePost(req: Request, res: Response){
        const { title, content } = req.body;
        const postId = Number(req.params.postId);
        const response = await postModel.update(postId, {title, content});
        res.json(response);
    }

    async deletePost(req: Request, res:Response){
        const postId = Number(req.params.postId);
        const response = await postModel.delete(postId);

        res.json(response);
    }
}

const postService = new PostService();

export default postService;