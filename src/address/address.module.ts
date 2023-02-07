import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address } from './address.entity';
import { Project } from '../project/project.entity';
import { Sample } from '../sample/sample.entity';
import { Species } from '../species/species.entity';

@Module({
    imports: [MikroOrmModule.forFeature([Address, Project, Sample, Species])],
    controllers: [AddressController],
    providers: [AddressService],
})
export class AddressModule {
    // do nothing.
}
