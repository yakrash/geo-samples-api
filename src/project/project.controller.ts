import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    constructor(private readonly service: ProjectService) {}

    @Post()
    async create(@Body() dto: CreateProjectDto): Promise<Project> {
        return await this.service.create(dto);
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<Project> {
        return await this.service.get(id);
    }

    @Get()
    async getAll(): Promise<Project[]> {
        return await this.service.getAll();
    }

    @Get(':id/data')
    async getProjectWithData(@Param('id') id: number) {
        return await this.service.getProjectData(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateProjectDto
    ): Promise<Project> {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.service.delete(id);
    }
}
