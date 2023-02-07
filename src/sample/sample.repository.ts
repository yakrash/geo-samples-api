import { EntityRepository } from '@mikro-orm/postgresql';
import { Sample } from './sample.entity';

export class SampleRepository extends EntityRepository<Sample> {}
