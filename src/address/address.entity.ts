import {
    Entity,
    EntityRepositoryType,
    ManyToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { Species } from '../species/species.entity';
import { Sample } from '../sample/sample.entity';
import { Project } from '../project/project.entity';
import { AddressRepository } from './address.repository';

@Entity({ customRepository: () => AddressRepository })
export class Address {
    [EntityRepositoryType]?: AddressRepository;

    constructor({ speciesId, sampleId, projectId, slide, glass }) {
        this.speciesId = speciesId;
        this.sampleId = sampleId;
        this.projectId = projectId;
        this.slide = slide;
        this.glass = glass;
    }

    @PrimaryKey()
    id: number;

    @ManyToOne(() => Species, { name: 'species_id', mapToPk: true })
    speciesId!: number;

    @ManyToOne(() => Sample, { name: 'sample_id', mapToPk: true })
    sampleId!: number;

    @ManyToOne(() => Project, { name: 'project_id', mapToPk: true })
    projectId: number;

    @Property()
    slide!: number;

    @Property()
    glass!: number;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}
