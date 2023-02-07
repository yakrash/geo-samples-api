import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSampleDto {
    @IsString()
    name: string;

    @IsNumber()
    serial: number;

    @IsNotEmpty()
    @IsNumber()
    projectId: number;
}
