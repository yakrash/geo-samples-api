import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity } from '../user.entity';
type TypeData = keyof UserEntity;

export const User = createParamDecorator(
    (data: TypeData, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        return data ? user[data] : user;
    }
);
