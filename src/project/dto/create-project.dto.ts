import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
