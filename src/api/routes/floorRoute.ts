import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import IRoomController from '../../controllers/IControllers/IRoomController';
import IFloorController from '../../controllers/IControllers/IFloorController';

const route = Router();

export default (app: Router) => {
  app.use('/floor', route);

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        buildingId: Joi.string().required(),
        number: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createFloor(req, res, next),
  );
};
