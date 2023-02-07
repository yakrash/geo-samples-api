import { defineConfig, LoadStrategy } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export default defineConfig({
    type: 'postgresql',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    dbName: 'geo',
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    debug: true,
    loadStrategy: LoadStrategy.JOINED,
    highlighter: new SqlHighlighter(),
    metadataProvider: TsMorphMetadataProvider,
    // // @ts-expect-error nestjs adapter option
    // registerRequestContext: false,
    migrations: {
        tableName: 'orm_migrations',
        path: process.cwd() + '/migrations',
        glob: '!(*.d).{js,ts}',
        transactional: true,
        disableForeignKeys: true,
        allOrNothing: true,
        emit: 'ts',
        snapshot: true,
    },
    // discovery: {
    //     warnWhenNoEntities: false, // by default, discovery throws when no entity is processed
    //     requireEntitiesArray: true, // force usage of class references in `entities` instead of paths
    //     alwaysAnalyseProperties: false, // do not analyse properties when not needed (with ts-morph)
    // },
    seeder: {
        path: './dist/seeders',
        pathTs: './seeders',
        defaultSeeder: 'InitSeeder',
        glob: '!(*.d).{js,ts}',
        emit: 'ts',
        fileName: (className: string) => className,
    },
});
