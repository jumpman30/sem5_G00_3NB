import { Request, Response, NextFunction } from 'express';

export default interface ITaskController {
  createSurveillanceTask(req: Request, res: Response, next: NextFunction);
  createPickupDeliveryTask(req: Request, res: Response, next: NextFunction);
  getAllTasks(req: Request, res: Response, next: NextFunction);
  getTaskById(req: Request, res: Response, next: NextFunction);
}
