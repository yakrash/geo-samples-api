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
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('project')
export class ProjectController {
    constructor(private readonly service: ProjectService) {}

    @Auth()
    @Post()
    async create(@Body() dto: CreateProjectDto): Promise<Project[]> {
        return await this.service.create(dto);
    }

    @Auth()
    @Get(':id')
    async get(@Param('id') id: number): Promise<Project> {
        return await this.service.get(id);
    }

    @Auth()
    @Get()
    async getAll(): Promise<Project[]> {
        return await this.service.getAll();
    }

    @Auth()
    @Get(':id/data')
    async getProjectWithData(@Param('id') id: number) {
        return await this.service.getProjectData(id);
    }

    @Auth()
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateProjectDto
    ): Promise<Project[]> {
        return await this.service.update(id, dto);
    }

    @Auth()
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.service.delete(id);
    }
}
