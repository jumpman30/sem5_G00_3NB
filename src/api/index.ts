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

  return app;
};
