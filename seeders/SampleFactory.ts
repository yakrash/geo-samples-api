import { Factory, Faker } from '@mikro-orm/seeder';
import { Sample } from '../src/sample/sample.entity';

export class SampleFactory extends Factory<Sample> {
    model = Sample;

    definition(faker: Faker): Partial<Sample> {
        return {
            name: faker.word.adjective(),
            serial: Number(faker.random.numeric(1)),
            projectId: 1,
        };
    }
}
