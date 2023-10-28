import { Request, Response, NextFunction } from 'express';

export default interface IRobotController  {
  createRobot(req: Request, res: Response, next: NextFunction);
  updateRobot(req: Request, res: Response, next: NextFunction);
  inhibtRobot(req: Request, res: Response, next: NextFunction);
  activateRobot(req: Request, res: Response, next: NextFunction);
  getRobot(req: Request, res: Response, next: NextFunction);
  getAll(req: Request, res: Response, next: NextFunction);
}
