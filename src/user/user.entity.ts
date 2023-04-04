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

    constructor({ email, password }) {
        this.email = email;
        this.password = password;
    }

    @PrimaryKey()
    id: number;

    @Property({ unique: true })
    email: string;

    @Property()
    password: string;

    @Property({ default: false })
    isAdmin?: boolean;

    @Property({ nullable: true })
    name?: string;
}
