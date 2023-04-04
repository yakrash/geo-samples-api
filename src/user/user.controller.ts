import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Auth()
    @Get('profile')
    async getProfile(@User('id') id: string) {
        return await this.userService.getProfile(id);
    }

    @UsePipes(new ValidationPipe())
    @Auth()
    @HttpCode(200)
    @Put('profile')
    async updateProfile(@User('id') id: string, @Body() dto: UpdateUserDto) {
        return await this.userService.updateProfile(id, dto);
    }

    @Auth()
    @Get('count')
    async getCount() {
        return await this.userService.getCount();
    }

    @UsePipes(new ValidationPipe())
    @Auth('admin')
    @HttpCode(200)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.userService.delete(id);
    }

    @Auth('admin')
    @HttpCode(200)
    @Get()
    async getAll() {
        return await this.userService.getAll();
    }
}
