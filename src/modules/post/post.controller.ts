import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
    constructor(private postService: PostService) {}

    @Get('all')
    getAllPost() {
        return this.postService.getAllPost();
    }

    @Post('new')
    createNewPost(@Body() data: any) {
        return this.postService.createPost(data);
    }

    @Get(':id')
    getPostById(@Param('id') id: string) {
        return this.postService.getPostById(id);
    }

    @Delete(':id')
    removePost(@Param('id') id: string) {
        return this.postService.removePost(id);
    }
}
