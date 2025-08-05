import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FileDB } from 'src/utils/file-utils';
import { User } from 'src/users/users.interface';

@Injectable()
export class AuthService {
    private userDb = new FileDB<User>('users.json');

    constructor(private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<User> {
        const users = await this.userDb.read();
        console.log(users)
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        return user;
    }

    async login(user: User) {
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
