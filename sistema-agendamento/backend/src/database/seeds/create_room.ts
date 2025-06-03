import type { Knex } from 'knex/types';

export async function seed (knex: Knex){
    await knex('rooms').insert([
        { name: 'Teste de Sala', building: 'Teste de predio'}
    ])
}