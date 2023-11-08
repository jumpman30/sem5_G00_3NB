import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/health', route);

  const ctrl = Container.get(config.controllers.health.name) as any;

  route.get(
    '',
    (req, res, next) => ctrl.health(req, res, next),
  );
};
