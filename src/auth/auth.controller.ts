import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    @Post('register')
    async register(@Body() dto: CreateUserDto) {
        // do nothing.
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: CreateUserDto) {
        // do nothing.
    }
}
