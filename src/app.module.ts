import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { SpeciesModule } from './species/species.module';
import { SampleModule } from './sample/sample.module';
import { AddressModule } from './address/address.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        ProjectModule,
        SpeciesModule,
        SampleModule,
        AddressModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
