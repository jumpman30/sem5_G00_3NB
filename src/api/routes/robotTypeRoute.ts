import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotTypeController from '../../controllers/IControllers/IRobotTypeController';

import config from '../../../config';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/robotType', route);
  app.use((req: Request, res: Response, next: NextFunction) =>
    middlewares.guarder(req, res, next, [
      'admin',
      'fleetManager',
    ]),
  );

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

  route.get('', (req,res,next) => ctrl.getAll(req,res,next));
};
