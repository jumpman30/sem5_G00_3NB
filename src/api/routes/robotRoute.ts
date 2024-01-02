import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotController from '../../controllers/IControllers/IRobotController';

import config from "../../../config";
import middlewares from '../middlewares';

const robot = Router();

export default (app: Router) => {
  app.use('/robots', robot);
  app.use((req: Request, res: Response, next: NextFunction) =>
    middlewares.guarder(req, res, next, [
      'admin',
      'fleetManager',
    ]),
  );

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  robot.get('', (req,res,next) => ctrl.getAll(req,res,next));

  robot.get('/:nickname', (req,res,next) => ctrl.getRobot(req,res,next));

  robot.post('',
    celebrate({
      body: Joi.object({
        nickname: Joi.string().required().error(new Error('Nickname inválido')),
        designation: Joi.string().required().error(new Error('designation inválida')),
        serialNumber: Joi.number().required().error(new Error('Numero série inválido')),
        state: Joi.boolean().required().error(new Error('state inválido')),
        robotType: Joi.string().required().error(new Error('invalid robot type')),
      })
    }),
    (req, res, next) => ctrl.createRobot(req, res, next) );

  robot.put('',
    celebrate({
      body: Joi.object({
        nickname: Joi.string().required().error(new Error('Nickname inválido')),
        designation: Joi.string().required().error(new Error('designation inválida')),
        serialNumber: Joi.number().required().error(new Error('Numero série inválido')),
        state: Joi.boolean().required().error(new Error('state inválido')),
      }),
    }),
    (req, res, next) => ctrl.updateRobot(req, res, next) );


    // Inhibt Robot
    robot.patch('/inhibt/:nickname',
    celebrate({
      params: Joi.object({
        nickname: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.inhibtRobot(req,res,next));

  // Activate Robot
  robot.patch('/a/:nickname',
    celebrate({
      params: Joi.object({
        nickname: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.activateRobot(req,res,next));
};
