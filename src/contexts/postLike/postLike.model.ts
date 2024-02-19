import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PostLikeModel {
    async likePost(postId: number, userId: number) {
        try{
        const like = await prisma.postLike.create({
            data: { postId, userId }
        });
        return like;}
        catch(e){
            return [];
        }
    }

    async getLikedPosts(userId: number) {
        const likedPosts = await prisma.postLike.findMany({
            where: { userId },
            include: { post: true }
        });
        return likedPosts.map(like => like.post);
    }

    async deleteLikedPost(postId: number, userId: number) {
        try{
        const deleteLike = await prisma.postLike.deleteMany({
            where: { postId, userId }
        });
        return deleteLike;}
        catch(e){
            console.log("error");
            return [];
        }
    }
}

const postLikeModel = new PostLikeModel();

export default postLikeModel;
