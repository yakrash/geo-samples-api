import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Auth {
    @PrimaryKey()
    id: number;

    @Property()
    email: string;

    @Property()
    passwordHash: string;
}
