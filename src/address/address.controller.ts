import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { AddressModule } from './address.module';

@Controller('address')
export class AddressController {
    @Post('create')
    async create(@Body() dto: Omit<AddressModule, 'id'>) {
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
    async update(@Param('id') id: string, @Body() dto: AddressModule) {
        // do nothing.
    }

    @Delete('id')
    async delete(@Param('id') id: string) {
        // do nothing.
    }
}
