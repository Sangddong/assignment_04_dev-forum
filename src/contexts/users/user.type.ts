import { Post } from "../post/post.type";
import { PostLike } from "../postLike/postLike.type";

export interface User{
    id: number;
    email: string
    encryptedPassword: string
    likedPost: PostLike
    comment: Comment
    post: Post
}