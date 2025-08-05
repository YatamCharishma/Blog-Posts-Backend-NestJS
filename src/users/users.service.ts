import { Injectable, NotFoundException } from '@nestjs/common';
import { FileDB } from 'src/utils/file-utils';
import { User } from './users.interface';
import { CreateUserDto } from './users.dto';


@Injectable()
export class UsersService {
    private userDb = new FileDB<User>('users.json');

    async getAllUsers(): Promise<User[]> {
        return this.userDb.read();
    }

    async getUserById(id: number): Promise<User> {
        const users = await this.userDb.read();
        const user = users.find(u => u.id === id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async createUser(data: CreateUserDto): Promise<User> {
        const users = await this.userDb.read();
        const newUser: User = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            ...data,
        };
        users.push(newUser);
        await this.userDb.write(users);
        return newUser;
    }

}
