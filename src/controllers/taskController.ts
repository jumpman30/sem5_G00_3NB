import { Inject, Service } from 'typedi';
import config from '../../config';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';

import ITaskService from '../services/IServices/ITaskService';
import ITaskController from './IControllers/ITaskController';
import {
  requestPickupDeliveryTaskDto,
  requestSurveillanceTaskDto,
  responseTaskDto,
} from '../dto/ITaskDto';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class TaskController implements ITaskController {
  constructor(
    @Inject(config.services.task.name)
    private taskService: ITaskService,
  ) {}

  public async approveTask(req: Request, res: Response, _next: NextFunction) {
    try {
      const taskId = req.params.taskId;
      const taskOrError = await this.taskService.approveTask(taskId);

      if (taskOrError.isFailure) {
        return res.status(404).send();
      }

      const responseTaskDTO = taskOrError.getValue();
      return res.status(201).json(responseTaskDTO);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  public async rejectTask(req: Request, res: Response, _next: NextFunction) {
    try {
      const taskId = req.params.taskId;
      const taskOrError = await this.taskService.rejectTask(taskId);

      if (taskOrError.isFailure) {
        return res.status(404).send();
      }

      const responseTaskDTO = taskOrError.getValue();
      return res.status(201).json(responseTaskDTO);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  updateTask(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction,
  ) {
    throw new Error('Method not implemented.');
  }

  public async createSurveillanceTask(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    try {
      const taskOrError = (await this.taskService.save(
        req.body as requestSurveillanceTaskDto,
      )) as Result<responseTaskDto>;

      if (taskOrError.isFailure) {
        return res.status(404).send();
      }
      return res.status(201).json(taskOrError.getValue());
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  public async createPickupDeliveryTask(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    try {
      const taskOrError = (await this.taskService.save(
        req.body as requestPickupDeliveryTaskDto,
      )) as Result<responseTaskDto>;

      if (taskOrError.isFailure) {
        return res.status(404).send();
      }
      return res.status(201).json(taskOrError.getValue());
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  public async getAllTasks(req: Request, res: Response, _next: NextFunction) {
    try {
      const taskOrError = await this.taskService.getAllTasks();

      if (taskOrError.isFailure) {
        return res.status(404).send();
      }

      const responseTaskDTO = taskOrError.getValue();
      return res.status(201).json(responseTaskDTO);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  public async getTaskById(req: Request, res: Response, _next: NextFunction) {
    try {
      const taskOrError = await this.taskService.getTaskById(req.params.taskId);
      if (taskOrError.isFailure) {
        return res.status(404).send();
      }

      const responseTaskDTO = taskOrError.getValue();
      return res.status(201).json(responseTaskDTO);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}
