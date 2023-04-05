import {
    Entity,
    EntityRepositoryType,
    ManyToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { ProjectRepository } from './project.repository';
import { User } from '../user/user.entity';

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

    @ManyToOne(() => User, { name: 'user_id', mapToPk: true })
    userId: number;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}
