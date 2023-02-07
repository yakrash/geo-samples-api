import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Sample } from './sample.entity';

@Module({
    imports: [MikroOrmModule.forFeature([Sample])],
    controllers: [SampleController],
    providers: [SampleService],
})
export class SampleModule {
    // do nothing.
}
