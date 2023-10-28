import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import robot from './routes/robotRoute';
import robotType from './routes/robotTypeRoute';
import room from './routes/roomRoute';
import roomRoute from './routes/roomRoute';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  role(app);
  robot(app);
  robotType(app);
  roomRoute(app);

  return app;
};
