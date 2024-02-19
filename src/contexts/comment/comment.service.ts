import { Request, Response } from "express";
import commentModel from "./comment.model";

class CommentService{
    async createComment(req:Request, res: Response){
        const {content} = req.body;
        const userId = Number(req.user?.id);
        const postId = Number(req.params.id);
        if (!content) return res.status(400).json({message:"내용을 입력해주세요"});

        const response = await commentModel.create({userId:userId, content, postId: postId});

        res.json(response);
    }

    async readComment(req:Request, res: Response) {
        const postId = Number(req.params.postId);
        const comments = await commentModel.read(postId);

        res.json(comments);
    }

    async updateComment(req:Request, res: Response) {
        const {content} = req.body;
        const commentId = Number(req.params.postId);
        const response = await commentModel.update(commentId, {content});

        res.json(response);
    }

    async deleteComment(req:Request, res: Response){
        const commentId = Number(req.params.id);
        const response = await commentModel.delete(commentId);

        res.json(response);
    }
}

const commentService = new CommentService();

export default commentService;