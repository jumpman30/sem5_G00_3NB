import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import robot from './routes/robotRoute';
import robotType from './routes/robotTypeRoute';
import roomRoute from './routes/roomRoute';
import floorRoute from './routes/floorRoute';
import buildingRoute from './routes/buildingRoute';
import passageRoute from './routes/passageRoute';
import healthRoute from './routes/healthRoute';
import floorMapRoute from './routes/floorMapRoute';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  role(app);
  robot(app);
  robotType(app);
  roomRoute(app);
  floorRoute(app);
  buildingRoute(app);
  passageRoute(app);
  healthRoute(app);
  floorMapRoute(app);

  return app;
};
