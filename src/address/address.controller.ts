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
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('address')
export class AddressController {
    constructor(private readonly service: AddressService) {}

    @Auth()
    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() dto: CreateAddressDto): Promise<Address> {
        return await this.service.create(dto);
    }

    @Auth()
    @Get(':id')
    async get(@Param('id') id: number): Promise<Address> {
        return await this.service.get(id);
    }

    @Auth()
    @Get('project/:id')
    async getByProjectId(@Param('id') id: number): Promise<Address[]> {
        return await this.service.getByProjectId(id);
    }

    @Auth()
    @UsePipes(new ValidationPipe())
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateAddressDto
    ): Promise<Address> {
        return await this.service.update(id, dto);
    }

    @Auth()
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.service.delete(id);
    }
}
