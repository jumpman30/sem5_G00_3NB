import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import IRoomController from '../../controllers/IControllers/IRoomController';
import IFloorController from '../../controllers/IControllers/IFloorController';
import IPassageController from '../../controllers/IControllers/IPassageController';

const route = Router();

export default (app: Router) => {
  app.use('/passage', route);

  const ctrl = Container.get(config.controllers.passage.name) as IPassageController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        building1Id: Joi.string().required(),
        building2Id: Joi.string().required(),
        floor1Id: Joi.string().required(),
        floor2Id: Joi.string().required(),
        locationBuilding1: Joi.array().required(),
        locationBuilding2: Joi.array().required()
      }),
    }),
    (req, res, next) => ctrl.createPassage(req, res, next),
  );
};
