import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

class CommentModel {
    async create(data: { userId: number; content: string; postId: number; }) {
        const comment = await prisma.comment.create({ data })
        return comment;
    }

    async read(postId: number) {
        try {
            const comments = await prisma.comment.findMany({ where: { postId } });
            return comments;
        } catch (e) {
            return [];
        }
    }

    async update(id: number, data: { content: string }) {
        const updatedComment = await prisma.comment.update({ where: { id }, data })
        return updatedComment;
    }

    async delete(id: number) {
        const deletedComment = await prisma.comment.delete({ where: { id } });

        return deletedComment;
    }
}

const commentModel = new CommentModel();

export default commentModel;