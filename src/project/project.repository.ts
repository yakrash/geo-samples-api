import { EntityRepository } from '@mikro-orm/postgresql';
import { Project } from './project.entity';

export class ProjectRepository extends EntityRepository<Project> {}
