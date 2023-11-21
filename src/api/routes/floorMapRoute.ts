import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import IFloorMapController from '../../controllers/IControllers/IFloorMapController';

const route = Router();

export default (app: Router) => {
  app.use('/floorMap', route);

  const ctrl = Container.get(config.controllers.floorMap.name) as IFloorMapController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        floorId: Joi.string().required(),
        buildingId: Joi.string().required(),
        size: Joi.any().required(),
        rooms: Joi.any().required(),
        passages: Joi.any().required(),
        elevators: Joi.any().required()
      }),
    }),
    (req, res, next) => ctrl.createFloorMap(req, res, next),
  );

  route.get(
    '',
    (req, res, next) => ctrl.getAll(req, res, next),
  );
};
