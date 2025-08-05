// src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { FileDB } from 'src/utils/file-utils';
import { Post } from 'src/posts/posts.interface';
import { createPostDTO } from './posts.dto';

@Injectable()
export class PostsService {
    private db = new FileDB<Post>('posts.json');

    async getAllPosts(page: number, limit: number) {
        const posts = await this.db.read();
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedPosts = posts.slice(start, end);
        return {
            data: paginatedPosts,
            total: posts.length,
            page,
            limit,
            totalPages: Math.ceil(posts.length / limit),
        };
    }

    async getPostsById(id: number) {
        const post = await this.db.findById(id);
        if (!post) throw new NotFoundException('Post not found');
        return post;
    }

    async createPost(postDto: createPostDTO) {
        const posts = await this.db.read();
        const newPost: Post = {
            id: posts.length ? posts[posts.length - 1].id + 1 : 1,
            ...postDto,
        };
        await this.db.insert(newPost);
        return newPost;
    }

    async updatePost(id: number, updateDto: Partial<Post>) {
        const post = await this.db.findById(id);
        if (!post) throw new NotFoundException('Post not found');
        await this.db.update(id, updateDto);
        return { ...post, ...updateDto };
    }

    async deletePost(id: number) {
        const post = await this.db.findById(id);
        if (!post) throw new NotFoundException('Post not found');
        await this.db.delete(id);
        return { message: 'Deleted' };
    }
}
