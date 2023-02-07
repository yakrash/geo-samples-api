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
import { Address } from './address.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly service: AddressService) {}

    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() dto: CreateAddressDto): Promise<Address> {
        return await this.service.create(dto);
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<Address> {
        return await this.service.get(id);
    }

    @Get('project/:id')
    async getByProjectId(@Param('id') id: number): Promise<Address[]> {
        return await this.service.getByProjectId(id);
    }

    @UsePipes(new ValidationPipe())
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateAddressDto
    ): Promise<Address> {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.service.delete(id);
    }
}
