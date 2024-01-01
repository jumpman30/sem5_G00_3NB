import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import ITaskController from "../../controllers/IControllers/ITaskController";
const route = Router();

export default (app: Router) => {
  app.use('/floor', route);

  const ctrl = Container.get(config.controllers.task.name) as ITaskController;

route.post(
    '/surveillance',
    celebrate({
      body: Joi.object({
        taskId: Joi.string().required(),
        user: Joi.string().required(),
        taskType: Joi.string().required(),
        taskStatus: Joi.string().required(),
        buildingId: Joi.string().required(),
        floorId: Joi.string().required(),
        emergencyContact: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createSurveillanceTask(req, res, next),
  );

  route.post(
    '/pickupdelivery',
    celebrate({
      body: Joi.object({
        taskId: Joi.string().required(),
        user: Joi.string().required(),
        taskType: Joi.string().required(),
        taskStatus: Joi.string().required(),
        pickupRoomId: Joi.string().required(),
        deliveryRoomId: Joi.string().required(),
        deliveryConfirmationCode: Joi.number().required(),
        description: Joi.string().required(),
        buildingId: Joi.string().required(),
        floorId: Joi.string().required(),
        emergencyContact: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createPickupDeliveryTask(req, res, next),
  );

  route.get(
    '',(req, res, next) => ctrl.getAllTasks(req, res, next),
  );

  route.get(
    '/:taskId',
    celebrate({
      params: Joi.object({
        taskId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getTaskById(req, res, next),
  );

}
