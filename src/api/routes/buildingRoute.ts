import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IBuildingController from '../../controllers/IControllers/IBuildingController';

import config from '../../../config';

const building = Router();

export default (app: Router) => {
  app.use('/building', building);

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  //building.get('', (req, res, next) => ctrl.getAll(req, res, next));

  building.post(
    '',
    celebrate({
      body: Joi.object({
        code: Joi.string()
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
};
