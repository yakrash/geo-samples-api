import { Migration } from '@mikro-orm/migrations';

export class Migration20230401150934 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "species" ("id" serial primary key, "name" varchar(255) not null);'
        );

        this.addSql(
            'create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "is_admin" boolean null default false, "name" varchar(255) null);'
        );
        this.addSql(
            'alter table "user" add constraint "user_email_unique" unique ("email");'
        );

        this.addSql(
            'create table "project" ("id" serial primary key, "name" varchar(255) not null, "user_id" int not null);'
        );

        this.addSql(
            'create table "sample" ("id" serial primary key, "name" varchar(255) null, "serial" int not null, "project_id" int not null);'
        );

        this.addSql(
            'create table "address" ("id" serial primary key, "species_id" int not null, "sample_id" int not null, "project_id" int not null, "slide" int not null, "glass" int not null);'
        );

        this.addSql(
            'alter table "project" add constraint "project_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
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
            'alter table "address" drop constraint "address_species_id_foreign";'
        );

        this.addSql(
            'alter table "project" drop constraint "project_user_id_foreign";'
        );

        this.addSql(
            'alter table "sample" drop constraint "sample_project_id_foreign";'
        );

        this.addSql(
            'alter table "address" drop constraint "address_project_id_foreign";'
        );

        this.addSql(
            'alter table "address" drop constraint "address_sample_id_foreign";'
        );

        this.addSql('drop table if exists "species" cascade;');

        this.addSql('drop table if exists "user" cascade;');

        this.addSql('drop table if exists "project" cascade;');

        this.addSql('drop table if exists "sample" cascade;');

        this.addSql('drop table if exists "address" cascade;');
    }
}
