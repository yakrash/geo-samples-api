import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Species } from './species.entity';
import { SpeciesRepository } from './species.repository';
import { SpeciesDto } from './dto/species.dto';

@Injectable()
export class SpeciesService {
    constructor(private readonly repo: SpeciesRepository) {}

    async get(id: number): Promise<Species> {
        const species = await this.repo.findOne(id);
        if (!species) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return species;
    }

    async create(dto: SpeciesDto): Promise<Species> {
        const species = new Species(dto);
        await this.repo.persistAndFlush(species);
        return species;
    }

    async getAll(): Promise<Species[]> {
        return this.repo.findAll();
    }

    async update(id: number, dto: SpeciesDto) {
        const species = await this.repo.findOne(id);
        if (!species) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        Object.assign(species, dto);
        await this.repo.flush();

        return this.repo.findAll();
    }

    async delete(id: number) {
        const species = await this.repo.nativeDelete({ id });
        if (!species) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return species;
    }
}
