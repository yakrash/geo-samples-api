import { EntityRepository } from '@mikro-orm/postgresql';
import { Address } from './address.entity';

export class AddressRepository extends EntityRepository<Address> {}
