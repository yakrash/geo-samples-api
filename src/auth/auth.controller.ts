import {
    Body,
    Controller,
    HttpCode,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() dto: CreateUserDto) {
        return await this.service.register(dto);
    }

    @Post('login')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async login(@Body() dto: CreateUserDto) {
        return await this.service.login(dto);
    }

    @Post('login/access-token')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async getNewTokens(@Body() dto: RefreshTokenDto) {
        return await this.service.getNewTokens(dto);
    }
}
