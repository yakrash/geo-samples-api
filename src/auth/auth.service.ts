import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../user/user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: EntityRepository<User>
    ) {}

    async createUser(dto: CreateUserDto) {}

    async findUser(email: string) {}
}
