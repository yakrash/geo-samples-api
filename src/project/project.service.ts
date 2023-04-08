import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './project.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Species } from '../species/species.entity';
import { Sample } from '../sample/sample.entity';
import { Address } from '../address/address.entity';

@Injectable()
export class ProjectService {
    constructor(
        private readonly repo: ProjectRepository,
        @InjectRepository(Address)
        private readonly addressRepo: EntityRepository<Address>,
        @InjectRepository(Species)
        private readonly speciesRepo: EntityRepository<Species>,
        @InjectRepository(Sample)
        private readonly sampleRepo: EntityRepository<Sample>
    ) {}

    async create(dto: CreateProjectDto): Promise<Project[]> {
        const project = new Project(dto);
        await this.repo.persistAndFlush(project);

        const sample = new Sample({
            name: '',
            serial: 1,
            projectId: project.id,
        });
        await this.sampleRepo.persistAndFlush(sample);
        return this.repo.find({ userId: dto.userId });
    }

    async get(id: number): Promise<Project> {
        const project = await this.repo.findOne(id);
        if (!project) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return project;
    }

    async getAll(): Promise<Project[]> {
        return this.repo.findAll();
    }

    async getProjectData(id: number) {
        const project = await this.repo.findOne(id);
        const addresses = await this.addressRepo.find({ projectId: id });
        const samples = await this.sampleRepo.find({ projectId: id });
        const species = await this.speciesRepo.findAll();
        return { project, addresses, species, samples };
    }

    async update(id: number, dto: UpdateProjectDto): Promise<Project[]> {
        const project = await this.repo.findOne(id);
        if (!project) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        project.name = dto.name;
        await this.repo.flush();

        return this.repo.find({ userId: project.userId });
    }

    async delete(id: number) {
        await this.addressRepo.nativeDelete({ projectId: id });
        await this.sampleRepo.nativeDelete({ projectId: id });
        await this.repo.nativeDelete({ id });
    }
}
