import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly repo: UserRepository) {
    }

    async getProfile(id) {
        const profile = await this.getById(id);

        return this.getUserWithoutPass(profile);
    }

    async updateProfile(id: string, dto: UpdateUserDto) {
        const user = await this.getById(id);
        const isSameUser = await this.repo.findOne({ email: dto.email });
        if (isSameUser && String(id) !== String(isSameUser.id)) {
            throw new NotFoundException('Email already exist');
        }
        if (dto.password) {
            const salt = await genSalt(10);
            user.password = await hash(dto.password, salt);
        }
        user.email = dto.email;
        // if (dto.isAdmin || dto.isAdmin === false) {
        //     user.isAdmin = dto.isAdmin;
        // }
        await this.repo.persistAndFlush(user);
        return;
    }

    async getCount() {
        return await this.repo.count();
    }

    async delete(id: string) {
        const user = await this.getById(id);
        return await this.repo.removeAndFlush(user);
    }

    async getAll() {
        return await this.repo.findAll();
    }

    private async getById(id) {
        const user = await this.repo.findOne({ id });
        if (!user) throw new NotFoundException('User not found');

        return user;
    }

    private getUserWithoutPass(user: User) {
        return {
            email: user.email,
            isAdmin: user.isAdmin,
            name: user.name,
        };
    }
}
