import {Request, Response} from 'express';
import knex from '../database/connection';

class RoomsController {
    async index(request: Request, response: Response)  {  
        const rooms = await knex('rooms').select('rooms.*').orderBy('name');
        return response.json(rooms);
    }
    async dataUpdate(request: Request, response: Response)  {  
        const {id_room} = request.params;
        const room = await knex('rooms').where('id_room', id_room).first();
        if(!room){
            return response.send('Room not exist')
        }
        return response.json(room);
    }


    async create(request: Request, response: Response){
        const {name} = request.body;

        const trx = await knex.transaction();

        const roomExists = await trx('rooms').where('name', name).first();

        if (roomExists) {
            await trx.rollback();
            return response.status(400).json({error: 'Room already exists'});
        };

        const room = await trx('rooms').insert(request.body);

        await trx.commit();

        return response.json(`Room with id ${room} created successfully`);
    }

    async update(request: Request, response: Response){

        const {id_room} = request.params;

        const {name, building} = request.body;

        const trx = await knex.transaction();

        const idExists = await trx('rooms').where('id_room', id_room).first();

        if(!idExists){
            await trx.rollback();
            return response.status(400).json({error: 'Rooms no exists'})
        }

        const roomExists = await trx('rooms')
        .where('name',name)
        .whereNot('id_room', id_room)
        .first()
        .select('*')

        if(idExists){
            await trx.rollback();
            return response.status(400).json({error: 'Rooms already exists'})
        }

        const room = await trx('rooms').where('id_room', id_room).update({
            name,
            building
        })

        return response.json(`Room with id ${room} updated successfully`);
    }
    
}

export default RoomsController;