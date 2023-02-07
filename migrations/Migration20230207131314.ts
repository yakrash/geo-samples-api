import { Migration } from '@mikro-orm/migrations';

export class Migration20230207131314 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "auth" ("id" serial primary key, "email" varchar(255) not null, "password_hash" varchar(255) not null);'
        );

        this.addSql(
            'create table "project" ("id" serial primary key, "name" varchar(255) not null, "user_id" int not null);'
        );

        this.addSql(
            'create table "sample" ("id" serial primary key, "name" varchar(255) not null, "serial" int not null, "project_id" int not null);'
        );

        this.addSql(
            'create table "species" ("id" serial primary key, "name" varchar(255) not null);'
        );

        this.addSql(
            'create table "address" ("id" serial primary key, "species_id" int not null, "sample_id" int not null, "project_id" int not null, "slide" int not null, "glass" int not null);'
        );

        this.addSql(
            'alter table "sample" add constraint "sample_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;'
        );

        this.addSql(
            'alter table "address" add constraint "address_species_id_foreign" foreign key ("species_id") references "species" ("id") on update cascade;'
        );
        this.addSql(
            'alter table "address" add constraint "address_sample_id_foreign" foreign key ("sample_id") references "sample" ("id") on update cascade;'
        );
        this.addSql(
            'alter table "address" add constraint "address_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;'
        );
    }

    async down(): Promise<void> {
        this.addSql(
            'alter table "sample" drop constraint "sample_project_id_foreign";'
        );

        this.addSql(
            'alter table "address" drop constraint "address_project_id_foreign";'
        );

        this.addSql(
            'alter table "address" drop constraint "address_sample_id_foreign";'
        );

        this.addSql(
            'alter table "address" drop constraint "address_species_id_foreign";'
        );

        this.addSql('drop table if exists "auth" cascade;');

        this.addSql('drop table if exists "project" cascade;');

        this.addSql('drop table if exists "sample" cascade;');

        this.addSql('drop table if exists "species" cascade;');

        this.addSql('drop table if exists "address" cascade;');
    }
}
