import {
    Entity,
    EntityRepositoryType,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { ProjectRepository } from './project.repository';

@Entity({ customRepository: () => ProjectRepository })
export class Project {
    [EntityRepositoryType]?: ProjectRepository;

    constructor({ name, userId }) {
        this.name = name;
        this.userId = userId;
    }

    @PrimaryKey()
    id: number;

    @Property()
    name: string;

    @Property()
    userId: number;
}
