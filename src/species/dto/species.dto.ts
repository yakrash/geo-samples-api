import { IsNotEmpty, IsString } from 'class-validator';

export class SpeciesDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
