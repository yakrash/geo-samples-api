import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';

@Module({
    imports: [MikroOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
