import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import IRoomController from '../../controllers/IControllers/IRoomController';

const route = Router();

export default (app: Router) => {
  app.use('/room', route);

  const ctrl = Container.get(config.controllers.room.name) as IRoomController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        buildingId: Joi.string().required(),
        designation: Joi.string().required(),
        doorLocation: Joi.object({
          x: Joi.string().required(),
          y: Joi.string().required(),
        }),
        floorId: Joi.string().required(),
        location: Joi.object({
          x: Joi.string().required(),
          y: Joi.string().required(),
        }),
      }),
    }),
    (req, res, next) => ctrl.createRoom(req, res, next),
  );
};
