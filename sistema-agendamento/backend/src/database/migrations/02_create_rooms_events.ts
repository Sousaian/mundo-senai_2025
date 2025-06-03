import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('rooms_events', table => {
    table.increments('id_rooms_events').primary();

    table.integer('id_room').unsigned().notNullable()
      .references('id_room').inTable('rooms')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.integer('id_event').unsigned().notNullable()
      .references('id_event').inTable('events')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('rooms_events');
}
