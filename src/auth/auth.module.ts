import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../user/user.entity';

@Module({
    imports: [MikroOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {
    // do nothing.
}
