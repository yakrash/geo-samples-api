import { TypeRole } from '../auth.interface';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { AdminGuard } from '../guards/admin.guard';

export const Auth = (role: TypeRole = 'user') =>
    applyDecorators(
        role === 'admin'
            ? UseGuards(JwtAuthGuard, AdminGuard)
            : UseGuards(JwtAuthGuard)
    );
