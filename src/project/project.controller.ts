import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ProjectModule } from './project.module';

@Controller('project')
export class ProjectController {
    @Post('create')
    async create(@Body() dto: Omit<ProjectModule, 'id'>) {
        // do nothing.
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        // do nothing.
    }

    @Get()
    async getAll() {
        // do nothing.
    }

    @Get(':id/data')
    async getProjectWithData(@Param('id') id: string) {
        // do nothing.
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: ProjectModule) {
        // do nothing.
    }

    @Delete('id')
    async delete(@Param('id') id: string) {
        // do nothing.
    }
}
