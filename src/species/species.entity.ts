import {
    Entity,
    EntityRepositoryType,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { SpeciesRepository } from './species.repository';

@Entity({ customRepository: () => SpeciesRepository })
export class Species {
    [EntityRepositoryType]?: SpeciesRepository;

    constructor(species) {
        this.name = species.name;
    }

    @PrimaryKey()
    id: number;

    @Property()
    name: string;
}
