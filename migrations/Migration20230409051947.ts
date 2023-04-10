import { Migration } from '@mikro-orm/migrations';

export class Migration20230409051947 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "species" ("id" serial primary key, "name" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
        );

        this.addSql(
            'create table "users" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "is_admin" boolean null default false, "name" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
        );
        this.addSql(
            'alter table "users" add constraint "users_email_unique" unique ("email");'
        );

        this.addSql(
            'create table "projects" ("id" serial primary key, "name" varchar(255) not null, "user_id" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
        );

        this.addSql(
            'create table "samples" ("id" serial primary key, "name" varchar(255) null, "serial" int not null, "project_id" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
        );

        this.addSql(
            'create table "addresses" ("id" serial primary key, "species_id" int not null, "sample_id" int not null, "project_id" int not null, "slide" int not null, "glass" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
        );

        this.addSql(
            'alter table "projects" add constraint "projects_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;'
        );

        this.addSql(
            'alter table "samples" add constraint "samples_project_id_foreign" foreign key ("project_id") references "projects" ("id") on update cascade;'
        );

        this.addSql(
            'alter table "addresses" add constraint "addresses_species_id_foreign" foreign key ("species_id") references "species" ("id") on update cascade;'
        );
        this.addSql(
            'alter table "addresses" add constraint "addresses_sample_id_foreign" foreign key ("sample_id") references "samples" ("id") on update cascade;'
        );
        this.addSql(
            'alter table "addresses" add constraint "addresses_project_id_foreign" foreign key ("project_id") references "projects" ("id") on update cascade;'
        );
    }

    async down(): Promise<void> {
        this.addSql(
            'alter table "addresses" drop constraint "addresses_species_id_foreign";'
        );

        this.addSql(
            'alter table "projects" drop constraint "projects_user_id_foreign";'
        );

        this.addSql(
            'alter table "samples" drop constraint "samples_project_id_foreign";'
        );

        this.addSql(
            'alter table "addresses" drop constraint "addresses_project_id_foreign";'
        );

        this.addSql(
            'alter table "addresses" drop constraint "addresses_sample_id_foreign";'
        );

        this.addSql('drop table if exists "species" cascade;');

        this.addSql('drop table if exists "users" cascade;');

        this.addSql('drop table if exists "projects" cascade;');

        this.addSql('drop table if exists "samples" cascade;');

        this.addSql('drop table if exists "addresses" cascade;');
    }
}
