import {
    Entity,
    EntityRepositoryType,
    ManyToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { Project } from '../project/project.entity';
import { SpeciesRepository } from '../species/species.repository';
import { SampleRepository } from './sample.repository';

@Entity({ customRepository: () => SampleRepository })
export class Sample {
    [EntityRepositoryType]?: SpeciesRepository;

    constructor({ name, serial, projectId }) {
        this.name = name;
        this.serial = serial;
        this.projectId = projectId;
    }

    @PrimaryKey()
    id: number;

    @Property()
    name?: string;

    @Property()
    serial: number;

    @ManyToOne(() => Project, { name: 'project_id', mapToPk: true })
    projectId: number;
}
