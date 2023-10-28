import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotTypeController from '../../controllers/IControllers/IRobotTypeController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/robotType', route);

  const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        brand: Joi.string().required(),
        model: Joi.string().required(),
        robotType: Joi.string().required(),
        taskTypes: Joi.array().items(Joi.string()).required()
      }),
    }),
    (req, res, next) => ctrl.createRobotType(req, res, next),
  );
};
