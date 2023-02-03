import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { SampleModule } from './sample.module';

@Controller('sample')
export class SampleController {
    @Post('create')
    async create(@Body() dto: Omit<SampleModule, 'id'>) {
        // do nothing.
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        // do nothing.
    }

    @Get('project/:id')
    async getByProjectId(@Param('id') id: string) {
        // do nothing.
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: SampleModule) {
        // do nothing.
    }

    @Delete('id')
    async delete(@Param('id') id: string) {
        // do nothing.
    }
}
