import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
    @IsNotEmpty()
    @IsNumber()
    speciesId: number;

    @IsNotEmpty()
    @IsNumber()
    sampleId: number;

    @IsNotEmpty()
    @IsNumber()
    projectId: number;

    @IsNotEmpty()
    @IsNumber()
    slide: number;

    @IsNotEmpty()
    @IsNumber()
    glass: number;
}
