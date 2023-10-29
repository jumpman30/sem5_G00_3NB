import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export default class HealthController {

  constructor() {
  }

  async health(req: Request, res: Response, next: NextFunction){
    return res.sendStatus(200);
  }
}
