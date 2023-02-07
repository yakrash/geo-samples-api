import { Species } from './species.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

export class SpeciesRepository extends EntityRepository<Species> {}
