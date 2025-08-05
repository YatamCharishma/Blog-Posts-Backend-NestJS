// src/posts/posts.controller.ts
import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Put,
    Delete,
    ParseIntPipe,
    UseGuards,
    Res,
    HttpStatus,
    BadRequestException,
    NotFoundException,
    Query,
} from '@nestjs/common';
import { Response } from 'express';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { createPostDTO, UpdatePostDto } from './posts.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    async getAllPosts(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Res() res: Response
    ) {
        try {
            const paginatedPosts = await this.postsService.getAllPosts(Number(page), Number(limit));
            return res.status(HttpStatus.OK).json(paginatedPosts);
        } catch (error) {
            throw new BadRequestException('Failed to fetch posts');
        }
    }

    @Get(':id')
    async getPostsById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const post = await this.postsService.getPostsById(id);
            if (!post) throw new NotFoundException('Post not found');
            return res.status(HttpStatus.OK).json(post);
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async createPost(@Body() body: createPostDTO, @Res() res: Response) {
        try {
            const post = await this.postsService.createPost(body);
            return res.status(HttpStatus.CREATED).json(post);
        } catch (error) {
            throw new BadRequestException('Failed to create post');
        }
    }

    @Put(':id')
    async updatePost(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdatePostDto,
        @Res() res: Response,
    ) {
        try {
            const updated = await this.postsService.updatePost(id, body);
            if (!updated) throw new NotFoundException('Post not found');
            return res.status(HttpStatus.OK).json(updated);
        } catch (error) {
            throw error;
        }
    }

    @Get('category/:category')
    async getPostsByCategory(@Param('category') category: string) {
        try {
            console.log(category);
            const posts = await this.postsService.getPostsByCategory(category);
            if (!posts.length) {
                throw new NotFoundException(`No posts found in category: ${category}`);
            }
            return posts;
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async deletePost(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const deleted = await this.postsService.deletePost(id);
            if (!deleted) throw new NotFoundException('Post not found');
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            throw error;
        }
    }
}
