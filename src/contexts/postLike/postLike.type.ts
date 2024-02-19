import { Post } from "../post/post.type"
import { User } from "../users/user.type"

export interface PostLike{
    postId: number
    userId: number
    post: Post
    user: User
}