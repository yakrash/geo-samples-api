import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Project } from '../src/project/project.entity';
import { Species } from '../src/species/species.entity';
import { Address } from '../src/address/address.entity';
import { Sample } from '../src/sample/sample.entity';
import { User } from '../src/user/user.entity';

export class InitSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        em.create(User, {
            name: 'Admin',
            isAdmin: true,
            email: 'kraash@bk.ru',
            password:
                '$2b$10$FwrRwZK3lT9Lmw4ubLB4weT2Td9BVjBmlQX4JI1FuM0XGnh8Ubax2',
        });

        em.create(Project, {
            name: 'Первый',
            userId: 1,
        });

        em.create(Project, {
            name: 'Новый 2023',
            userId: 1,
        });

        for (let i = 1; i < 16; i++) {
            em.create(Sample, {
                name: `Образец ${i}`,
                serial: i,
                projectId: 1,
            });
        }

        const nameSpecies = [
            { name: 'Комар' },
            { name: 'Муха' },
            { name: 'Паук' },
            { name: 'Стрекоза' },
            { name: 'Муравей' },
            { name: 'Обезьяна' },
            { name: 'Слон' },
            { name: 'Жираф' },
            { name: 'Корова' },
            { name: 'Собака' },
            { name: 'Кот' },
            { name: 'Голубь' },
            { name: 'Носорог' },
            { name: 'Петух' },
            { name: 'Желудь' },
        ];
        const species = [];
        nameSpecies.forEach((n) =>
            species.push(
                em.create(Species, {
                    name: n.name,
                })
            )
        );

        for (let i = 1; i < 16; i++) {
            em.create(Address, {
                speciesId: i,
                sampleId: i,
                projectId: 1,
                glass: 1,
                slide: 1,
            });
        }
    }
}
