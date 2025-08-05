import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        try {
            const user = await this.authService.validateUser(loginDto.username, loginDto.password);
            return this.authService.login(user);
        } catch (error) {
            throw error;
        }
    }
}
