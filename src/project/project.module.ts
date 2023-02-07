import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { Address } from '../address/address.entity';
import { Sample } from '../sample/sample.entity';
import { Species } from '../species/species.entity';

@Module({
    imports: [MikroOrmModule.forFeature([Project, Sample, Species, Address])],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}
