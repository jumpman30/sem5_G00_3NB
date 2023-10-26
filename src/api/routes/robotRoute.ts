import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotController from '../../controllers/IControllers/IRobotController';

import config from "../../../config";
import { MockJobCreatedEvent } from '../../core/domain/events/tests/mocks/events/mockJobCreatedEvent';

const robot = Router();

export default (app: Router) => {
  app.use('/robots', robot);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  robot.get('', (req,res,next) => ctrl.getAll(req,res,next));

  robot.get('/:nickname', (req,res,next) => ctrl.getRobot(req,res,next));

  robot.post('',
    celebrate({
      body: Joi.object({
        nickname: Joi.string().required().error(new Error('Nickname inválido')),
        designacao: Joi.string().required().error(new Error('Designacao inválida')),
        numeroSerie: Joi.number().required().error(new Error('Numero série inválido')),
        estado: Joi.boolean().required().error(new Error('Estado inválido')),
      })
    }),
    (req, res, next) => ctrl.createRobot(req, res, next) );

  robot.put('',
    celebrate({
      body: Joi.object({
        nickname: Joi.string().required().error(new Error('Nickname inválido')),
        designacao: Joi.string().required().error(new Error('Designacao inválida')),
        numeroSerie: Joi.number().required().error(new Error('Numero série inválido')),
        estado: Joi.boolean().required().error(new Error('Estado inválido')),
      }),
    }),
    (req, res, next) => ctrl.updateRobot(req, res, next) );

  // Inactivate Robot
  robot.delete('/i/:nickname',
    celebrate({
      params: Joi.object({
        nickname: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.inactivateRobot(req,res,next));

  // Activate Robot
  robot.patch('/a/:nickname',
    celebrate({
      params: Joi.object({
        nickname: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.activateRobot(req,res,next));
};
