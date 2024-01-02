import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import IRoomController from '../../controllers/IControllers/IRoomController';
import IFloorController from '../../controllers/IControllers/IFloorController';
import IPassageController from '../../controllers/IControllers/IPassageController';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/passage', route);
  app.use((req: Request, res: Response, next: NextFunction) =>
    middlewares.guarder(req, res, next, [
      'admin',
      'campusManager',
    ]),
  );

  const ctrl = Container.get(config.controllers.passage.name) as IPassageController;

  route.get(
    '/buildings',
    celebrate({
      body: Joi.object({
        searchBuildingId1: Joi.string().required(),
        searchBuildingId2: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.findPassagesBetweenTwoBuildings(req, res, next),
  );

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

  route.put(
    '/:domainId',
    celebrate({
      params: Joi.object({
        domainId: Joi.string().required(), // Validating the ID parameter
      }),
      body: Joi.object({
        building1Id: Joi.string().optional(),
        building2Id: Joi.string().optional(),
        floor1Id: Joi.string().optional(),
        floor2Id: Joi.string().optional(),
        locationBuilding1: Joi.array().optional(),
        locationBuilding2: Joi.array().optional()
      }),
    }),
    (req, res, next) => ctrl.updatePassageByDomainId(req, res, next),
  );
};
