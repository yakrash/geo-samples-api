import { IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
    email: string;

    password?: string;
    name?: string;
    isAdmin?: boolean;
}
