import { compare, genSalt, hash } from 'bcrypt';
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { User } from '../user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: EntityRepository<User>,
        private readonly jwtService: JwtService
    ) {}

    async register(dto: CreateUserDto) {
        const existUser = await this.findUser(dto.email);
        if (existUser) {
            throw new BadRequestException(
                'UserEntity with this email is already in the system'
            );
        }
        const salt = await genSalt(10);
        const newUser = new User({
            email: dto.email,
            password: await hash(dto.password, salt),
        });
        await this.userRepo.persistAndFlush(newUser);
        const tokens = await this.issueTokenPair(String(newUser.id));

        return { user: this.getUserWithoutPass(newUser), ...tokens };
    }

    async login(dto: CreateUserDto) {
        const user = await this.validationUser(dto);
        const tokens = await this.issueTokenPair(String(user.id));

        return { user: this.getUserWithoutPass(user), ...tokens };
    }

    async getNewTokens({ refreshToken }: RefreshTokenDto) {
        if (!refreshToken) {
            throw new UnauthorizedException('Please sign in!');
        }
        const result = await this.jwtService.verifyAsync(refreshToken);
        if (!result) {
            throw new UnauthorizedException('Invalid token or expired');
        }
        const user = await this.userRepo.findOne({ id: result.id });
        const tokens = await this.issueTokenPair(String(user.id));

        return { user: this.getUserWithoutPass(user), ...tokens };
    }

    private async findUser(email: string) {
        return await this.userRepo.findOne({ email });
    }

    private async validationUser(dto: CreateUserDto): Promise<User> {
        const user = await this.findUser(dto.email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isValidPassword = await compare(dto.password, user.password);
        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid password');
        }
        return user;
    }

    private async issueTokenPair(userId: string) {
        const data = { id: userId };

        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: '15d',
        });
        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: '1h',
        });

        return { refreshToken, accessToken };
    }

    private getUserWithoutPass(user: User) {
        return {
            email: user.email,
            isAdmin: user.isAdmin,
            name: user.name,
        };
    }
}
