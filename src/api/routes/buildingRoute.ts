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
        code: Joi.string()
                .regex(/^[A-Za-z0-9 \s]*$/)
                .max(5)
                .required()
                .error(new Error('Invalid Building Code')),
        name: Joi.string(),
        length: Joi.number()
                .required()
                .error(new Error('Invalid Length')),
        width: Joi.number()
                .required()
              .error(new Error('Invalid Width')),
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

  route.get(
    '/getBuildingsByMinMax',
    celebrate({
      query: Joi.object({
        minFloor: Joi.string().required(),
        maxFloor: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getBuildingsByMinMax(req, res, next),
  );

  route.get('/:id/passages',
  celebrate({
    params: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  (req, res, next) => ctrl.getPassagesByBuildingId(req,res,next));
};
