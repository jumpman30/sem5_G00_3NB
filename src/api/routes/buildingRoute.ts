import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import IBuildingController from '../../controllers/IControllers/IBuildingController';
import IElevatorController from '../../controllers/IControllers/IElevatorController';

const route = Router();

export default (app: Router) => {
  app.use('/building', route);

  const elevatorCtrl = Container.get(config.controllers.elevator.name) as IElevatorController;
  const buildingCtrl = Container.get(config.controllers.building.name) as IBuildingController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        buildingId: Joi.string()
          .regex(/^[A-Za-z0-9\s]*$/)
          .max(5)
          .required()
          .error(
            new Error(
              'building needs to have an id with max 5 alphanumeric chars',
            ),
          ),
        designation: Joi.string().optional(),
        width: Joi.string().required(),
        length: Joi.string().required(),
      }),
    }),
    (req, res, next) => buildingCtrl.createBuilding(req, res, next),
  );

  route.put(
    '/update',
    celebrate({
      body: Joi.object({
        buildingId: Joi.string().regex(/^[A-Za-z0-9\s]*$/).max(5).required().error(new Error("building needs to have an id with max 5 alphanumeric chars")),
        designation: Joi.string().optional(),
        width: Joi.string().optional(),
        length: Joi.string().optional()
      }),
    }),
    (req, res, next) => buildingCtrl.updateBuilding(req, res, next),
  );

  route.get(
    '/getAllBuildings',
    (req, res, next) => buildingCtrl.getAllBuildings(req, res, next),
  );

  route.get(
    '/:buildingId/getFloorsByBuildingId',
    celebrate({
      params: Joi.object({
        buildingId: Joi.string().required(),
      }),
    }),
    (req, res, next) => buildingCtrl.getFloorsByBuildingId(req, res, next),
  );

  route.get(
    '/:minFloor/:maxFloor/getBuildingsByMinMax',
    celebrate({
      params: Joi.object({
        minFloor: Joi.string().required(),
        maxFloor: Joi.string().required(),
      }),
    }),
    (req, res, next) => buildingCtrl.getBuildingsByMinMax(req, res, next),
  );

  route.get(
    '/:id/passages',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => buildingCtrl.getPassagesByBuildingId(req, res, next),
  );

  route.get('/:id/passages',
  celebrate({
    params: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  (req, res, next) => buildingCtrl.getPassagesByBuildingId(req,res,next),
  );

  route.post(
    '/:buildingId/elevator',
    celebrate({
      params: Joi.object({
        buildingId: Joi.string().required(),
      }),
      body: Joi.object({
        availableFloorNumbers: Joi.array().items(Joi.string().required()),
        serialNumber: Joi.string()
          .optional()
          .default(''),
        description: Joi.string()
          .optional()
          .default(''),
        model: Joi.string()
          .optional()
          .default(''),
        brand: Joi.string()
          .optional()
          .default(''),
      }),
    }),
    (req, res, next) => elevatorCtrl.createElevator(req, res, next),
  );

  route.get(
    '/:buildingId/elevators',
    celebrate({
      params: Joi.object({
        buildingId: Joi.string().required(),
      }),
    }),
    (req, res, next) => elevatorCtrl.getElevatorsByBuildingId(req, res, next),
  );
};
