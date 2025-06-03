import { Router, Request, Response } from 'express';
import RoomsController from './controllers/RoomsController';
import EventsController from './controllers/EventsController';
import { celebrate, Joi } from 'celebrate';

const routes = Router();
const roomsController = new RoomsController();
const eventsController = new EventsController();

routes.get('/rooms', async (req: Request, res: Response) => {
  await roomsController.index(req, res);
});

routes.post('/rooms',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().max(50),
      building: Joi.string().required().max(50)
    })
  }, { abortEarly: false }),
  async (req: Request, res: Response) => {
    await roomsController.create(req, res);
  }
);

routes.put('/rooms/:id_room', async (req: Request, res: Response) => {
  await roomsController.update(req, res);
});

routes.put('/rooms/:id_room', async (req: Request, res: Response) => {
  await roomsController.dataUpdate(req, res);
});


routes.get('/events', async (req: Request, res: Response) => {
  await eventsController.index(req, res);
});

routes.get('/events_day', async (req: Request, res: Response) => {
  await eventsController.eventsOfDay(req, res);
});

routes.post('/events',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().max(50),
      description: Joi.string().required().max(200),
      responsible: Joi.string().required().max(50),
      date_time: Joi.string().required(),
      rooms: Joi.array().required()
    })
  }, { abortEarly: false }),
  async (req: Request, res: Response) => {
    await eventsController.create(req, res);
  }
);

routes.delete('/events/:id_event', async (req: Request, res: Response) => {
  await eventsController.remove(req, res);
});

routes.get('/events/:id_event', async (req: Request, res: Response) => {
  await eventsController.dataRemove(req, res);
});


export default routes;
