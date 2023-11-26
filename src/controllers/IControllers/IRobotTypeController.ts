import { Request, Response, NextFunction } from 'express';

export default interface IRobotTypeController {
  createRobotType(req: Request, res: Response, next: NextFunction);
  getAll(req: Request, res: Response, next: NextFunction);
}
