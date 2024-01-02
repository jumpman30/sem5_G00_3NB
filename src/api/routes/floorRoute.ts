import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import IFloorController from '../../controllers/IControllers/IFloorController';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/floor', route);
  app.use((req: Request, res: Response, next: NextFunction) =>
    middlewares.guarder(req, res, next, [
      'admin',
      'campusManager',
    ]),
  );

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

  route.patch(
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
    (req, res, next) => ctrl.patchFloorMap(req, res, next),
  );

  route.get(
    '',
    celebrate({
      query: Joi.object({
        buildingId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getAllFloorsByBuildingId(req, res, next),
  );
};
