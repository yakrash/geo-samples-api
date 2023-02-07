import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { Sample } from './sample.entity';
import { SampleService } from './sample.service';

@Controller('sample')
export class SampleController {
    constructor(private readonly service: SampleService) {}

    @Post()
    async create(@Body() dto: CreateSampleDto): Promise<Sample> {
        return await this.service.create(dto);
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<Sample> {
        return await this.service.get(id);
    }

    @Get('project/:id')
    async getByProjectId(@Param('id') id: number): Promise<Sample[]> {
        return await this.service.getByProjectId(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateSampleDto
    ): Promise<Sample> {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.service.delete(id);
    }
}
