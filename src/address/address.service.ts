import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { Project } from '../project/project.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Species } from '../species/species.entity';
import { Sample } from '../sample/sample.entity';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
    constructor(
        private readonly repo: AddressRepository,
        @InjectRepository(Project)
        private readonly projectRepo: EntityRepository<Project>,
        @InjectRepository(Species)
        private readonly speciesRepo: EntityRepository<Species>,
        @InjectRepository(Sample)
        private readonly sampleRepo: EntityRepository<Sample>
    ) {}

    private readonly logger = new Logger(AddressService.name);

    async get(id: number): Promise<Address> {
        const address = await this.repo.findOne(id);
        if (!address) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return address;
    }

    async create(dto: CreateAddressDto): Promise<Address> {
        await this.check(dto);
        const address = new Address(dto);
        await this.repo.persistAndFlush(address);
        return address;
    }

    async getByProjectId(id: number): Promise<Address[]> {
        return this.repo.find({ projectId: id });
    }

    async update(id: number, dto: UpdateAddressDto): Promise<Address> {
        await this.check(dto);

        const address = await this.repo.findOne(id);
        if (!address) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        Object.assign(address, dto);
        await this.repo.flush();

        return address;
    }

    async delete(id: number) {
        const address = await this.repo.nativeDelete({ id });
        if (!address) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return address;
    }

    private async check(dto: CreateAddressDto) {
        const project = await this.projectRepo.findOne(dto.projectId);
        if (!project) {
            const message = `Not found project with id = ${dto.projectId}`;
            this.logger.warn(message);
            throw new HttpException(message, HttpStatus.NOT_FOUND);
        }

        const sample = await this.sampleRepo.findOne(dto.sampleId);
        if (!sample) {
            const message = `Not found project with id = ${dto.projectId}`;
            this.logger.warn(message);
            throw new HttpException(message, HttpStatus.NOT_FOUND);
        }

        const species = await this.speciesRepo.findOne(dto.speciesId);
        if (!species) {
            const message = `Not found species with id = ${dto.speciesId}`;
            this.logger.warn(message);
            throw new HttpException(message, HttpStatus.NOT_FOUND);
        }
    }
}
