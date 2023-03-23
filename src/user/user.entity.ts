import {
    Entity,
    EntityRepositoryType,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { UserRepository } from './user.repository';

@Entity({ customRepository: () => UserRepository })
export class User {
    [EntityRepositoryType]?: UserRepository;

    @PrimaryKey()
    id: number;

    @Property({ unique: true })
    email: string;

    @Property()
    password: string;
}
