import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { CreateSampleDto } from './dto/create-sample.dto';
import { Sample } from './sample.entity';
import { SampleRepository } from './sample.repository';
import { QueryOrder } from '@mikro-orm/core';

@Injectable()
export class SampleService {
    constructor(private readonly repo: SampleRepository) {}

    async create(dto: CreateSampleDto): Promise<Sample> {
        const lastSample = await this.repo.findOne(
            { projectId: dto.projectId },
            { orderBy: { serial: QueryOrder.DESC } }
        );
        dto.serial = lastSample.serial + 1;
        const sample = new Sample(dto);
        await this.repo.persistAndFlush(sample);
        return sample;
    }

    async get(id: number): Promise<Sample> {
        const sample = await this.repo.findOne(id);
        if (!sample) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return sample;
    }

    async getByProjectId(id: number): Promise<Sample[]> {
        return this.repo.find({ projectId: id });
    }

    async update(id: number, dto: UpdateSampleDto): Promise<Sample> {
        const sample = await this.repo.findOne(id);
        if (!sample) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        sample.name = dto.name;
        await this.repo.flush();
        return sample;
    }

    async delete(id: number) {
        const sample = await this.repo.nativeDelete({ id });
        if (!sample) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return sample;
    }
}
