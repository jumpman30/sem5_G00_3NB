import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
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

  route.get(
    '/getFloorsByBuildingId',
    celebrate({
      query: Joi.object({
        buildingId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getFloorsByBuildingId(req, res, next),
  );
};
