import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import IRoomController from '../../controllers/IControllers/IRoomController';
import IFloorController from '../../controllers/IControllers/IFloorController';
import IBuildingController from '../../controllers/IControllers/IBuildingController';

const route = Router();

export default (app: Router) => {
  app.use('/building', route);

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        designation: Joi.string().required(),
        width: Joi.string().required(),
        length: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.createBuilding(req, res, next),
  );
};
