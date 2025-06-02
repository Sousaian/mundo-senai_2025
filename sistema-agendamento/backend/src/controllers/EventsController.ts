import { Request, Response } from 'express';
import knex from '../database/connection';
import {
  parseISO,
  startOfHour,
  format,
  isPast,
  endOfDay,
  startOfDay,
} from 'date-fns';

class EventsController {
  async index(request: Request, response: Response) {
    const events = await knex('rooms_events')
      .join('events', 'events.id_event', '=', 'rooms_events.id_event')
      .join('rooms', 'rooms.id_room', '=', 'rooms_events.id_room')
      .select([
        knex.raw('group_concat(rooms.name) AS room_name'),
        knex.raw('group_concat(rooms.building) AS building'),
        'events.*'
      ])
      .groupBy('rooms_events.id_event')
      .orderBy('date_time');

    const serializedItens = events.map((event) => {
      const buildingArray = event.building.split(',');
      const roomNameArray = event.room_name.split(',');

      const buildingRooms = buildingArray.map((building: string, i: number) => ({
        building,
        room: roomNameArray[i],
      }));

      return {
        id_event: event.id_event,
        location: buildingRooms,
        name_event: event.name,
        description: event.description,
        date_time: format(event.date_time, "'Data:' dd'/'MM'/'yyyy 'Horario:' HH':'mm"),
        responsible: event.responsible,
      };
    });

    response.json(serializedItens);
  }

  async eventsOfDay(request: Request, response: Response) {
    const { day = new Date().toISOString() } = request.query;
    const searchDate = parseISO(day as string);

    const events = await knex('rooms_events')
      .join('events', 'events.id_event', '=', 'rooms_events.id_event')
      .join('rooms', 'rooms.id_room', '=', 'rooms_events.id_room')
      .select([
        knex.raw('group_concat(rooms.name) AS room_name'),
        knex.raw('group_concat(rooms.building) AS building'),
        'events.*'
      ])
      .whereBetween('date_time', [
        startOfDay(searchDate),
        endOfDay(searchDate),
      ])
      .groupBy('rooms_events.id_event')
      .orderBy('date_time');

    const serializedItens = events.map((event) => {
      const buildingArray = event.building.split(',');
      const roomNameArray = event.room_name.split(',');

      const buildingRooms = buildingArray.map((building: string, i: number) => ({
        building,
        room: roomNameArray[i],
      }));

      return {
        id_event: event.id_event,
        location: buildingRooms,
        name_event: event.name,
        description: event.description,
        date_time: format(event.date_time, "'Data:' dd'/'MM'/'yyyy 'Horario:' HH':'mm"),
        responsible: event.responsible,
      };
    });

    response.json(serializedItens);
  }

  async create(request: Request, response: Response) {
    const { name, description, date_time, responsible, rooms } = request.body;

    const trx = await knex.transaction();

    const parseDateTime = parseISO(date_time);
    const eventDateTime = startOfHour(parseDateTime);

    if (isPast(eventDateTime)) {
      await trx.rollback();
      return response.status(400).json({ message: 'This date is before the actual date' });
    }

    for (const id_room of rooms) {
      const conflict = await trx('rooms_events')
        .join('events', 'events.id_event', '=', 'rooms_events.id_event')
        .where('date_time', eventDateTime)
        .andWhere('rooms_events.id_room', id_room)
        .first();

      if (conflict) {
        await trx.rollback();
        return response.status(400).json({ message: 'There is already one event in this time' });
      }
    }

    const [id_event] = await trx('events').insert({
      name,
      description,
      date_time: eventDateTime,
      responsible,
    });

    const rooms_events = rooms.map((id_room: number) => ({
      id_room,
      id_event,
    }));

    await trx('rooms_events').insert(rooms_events);
    await trx.commit();

    return response.status(201).json({ message: 'Event inserted with success' });
  }

  async remove(request: Request, response: Response) {
    const { id_event } = request.params;

    const trx = await knex.transaction();

    const verify = await trx('events').where('id_event', id_event).first();

    if (!verify) {
      await trx.rollback();
      return response.status(404).json({ message: 'Event not exists' });
    }

    await trx('events').where('id_event', id_event).del();
    await trx.commit();

    return response.json({ message: 'Deleted with success' });
  }

  async dataRemove(request: Request, response: Response) {
    const { id_event } = request.params;

    const event = await knex('events').where('id_event', id_event).first();

    if (!event) {
      return response.status(404).json({ message: 'Event not exists' });
    }

    return response.json({
      id_event: event.id_event,
      description: event.description,
      date_time: format(event.date_time, "'Data:' dd'/'MM'/'yyyy 'Horario:' HH':'mm"),
      responsible: event.responsible,
    });
  }
}

export default EventsController;
