import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { SpeciesModule } from './species.module';

@Controller('species')
export class SpeciesController {
    @Post('create')
    async create(@Body() dto: Omit<SpeciesModule, 'id'>) {
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

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: SpeciesModule) {
        // do nothing.
    }

    @Delete('id')
    async delete(@Param('id') id: string) {
        // do nothing.
    }
}
