import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res,
    HttpStatus,
    NotFoundException,
    BadRequestException,
    ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAllUsers(@Res() res: Response) {
        try {
            const users = await this.usersService.getAllUsers();
            return res.status(HttpStatus.OK).json(users);
        } catch (error) {
            throw new BadRequestException('Failed to fetch users');
        }
    }

    @Get(':id')
    async getUserById(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response,
    ) {
        try {
            const user = await this.usersService.getUserById(id);
            if (!user) throw new NotFoundException('User not found');
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async createUser(
        @Body() createUserDto: CreateUserDto,
        @Res() res: Response,
    ) {
        try {
            const newUser = await this.usersService.createUser(createUserDto);
            return res.status(HttpStatus.CREATED).json(newUser);
        } catch (error) {
            throw new BadRequestException('Failed to create user');
        }
    }
}
