import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

class PostModel {
    async create(data: {
        userId: number;
        category: 'frontend' | 'backend'
        title: string;
        content: string
    }) {
        const post = await prisma.post.create({ data })
        return post;
    }

    async findFrontendPosts() {
        try {
            const posts = await prisma.post.findMany({
                where: { category: 'frontend' },
                orderBy: { createdAt: 'desc' }
            });
            return posts;
        }
        catch (e) {
            throw e
        }
    }

    async findBackendPosts() {
        try {
            const posts = await prisma.post.findMany({
                where: { category: 'backend' },
                orderBy: { createdAt: 'desc' }
            });
            return posts;
        }
        catch(e){
            throw e;
        }
    }

    async findPagedFrontendPosts(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const posts = await prisma.post.findMany({
            where: { category: 'frontend' },
            take: limit,
            skip: skip,
        });
        return posts;
    }

    async findPagedBackendPosts(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const posts = await prisma.post.findMany({
            where: { category: 'backend' },
            take: limit,
            skip: skip,
        });
        return posts;
    }

    async findOne(id: number) {
        const post = await prisma.post.findUnique({ where: { id }, });
        return post;
    }

    async update(id: number, data: { title?: string; content?: string }) {
        const updatedPost = await prisma.post.update({ where: { id }, data });

        return updatedPost;
    }

    async delete(id: number) {
        const deletedPost = await prisma.post.delete({ where: { id } });

        return deletedPost;
    }
}

const postModel = new PostModel();

export default postModel;