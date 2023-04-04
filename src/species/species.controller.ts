import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Species } from './species.entity';
import { SpeciesService } from './species.service';
import { SpeciesDto } from './dto/species.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('species')
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) {}

    @Auth()
    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() dto: SpeciesDto): Promise<Species> {
        return await this.speciesService.create(dto);
    }

    @Auth()
    @Get(':id')
    async get(@Param('id') id: number): Promise<Species> {
        return await this.speciesService.get(id);
    }

    @Get()
    async getAll(): Promise<Species[]> {
        return await this.speciesService.getAll();
    }

    @Auth()
    @UsePipes(new ValidationPipe())
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() dto: SpeciesDto
    ): Promise<Species> {
        return await this.speciesService.update(id, dto);
    }

    @Auth()
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.speciesService.delete(id);
    }
}
