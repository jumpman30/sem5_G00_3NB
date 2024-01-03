import ITaskService from './IServices/ITaskService';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import ITaskRepo from '../repos/IRepos/ITaskRepo';
import {
  requestPickupDeliveryTaskDto,
  requestSurveillanceTaskDto,
  responseTaskDto,
} from '../dto/ITaskDto';
import { TaskType } from '../domain/task/TaskType';
import { TaskMapper } from '../mappers/TaskMap';
import { SurveillanceTask } from '../domain/task/SurveillanceTask';
import { TaskStatus } from '../domain/task/taskStatus';
import { PickupDeliveryTask } from '../domain/task/PickupDeliveryTask';

@Service()
export default class TaskService implements ITaskService {
  constructor(
    @Inject(config.repos.taskRepo.name) private taskRepo: ITaskRepo,
  ) {}

  public async getTaskById(taskId: string): Promise<Result<responseTaskDto>> {
    throw new Error('Method not implemented.');
  }

  public async save(
    taskDto: requestSurveillanceTaskDto | requestPickupDeliveryTaskDto,
  ): Promise<Result<responseTaskDto>> {
    try {
      switch (taskDto.taskType) {
        case TaskType.Surveillance.toString(): {
          const surveillanceTask = taskDto as requestSurveillanceTaskDto;
          const taskOrError = SurveillanceTask.create({
            taskId: surveillanceTask.taskId,
            user: surveillanceTask.user,
            taskType: (surveillanceTask.taskType as unknown) as TaskType,
            taskStatus: (surveillanceTask.taskStatus as unknown) as TaskStatus,
            buildingId: surveillanceTask.buildingId,
            floorId: surveillanceTask.floorId,
            emergencyContact: surveillanceTask.emergencyContact,
          });

          if (taskOrError.isFailure) {
            throw Result.fail<responseTaskDto>(taskOrError.errorValue());
          }

          try {
            const taskCreated = await this.taskRepo.save(
              taskOrError.getValue(),
            );
            return Result.ok<responseTaskDto>(
              TaskMapper.toDto(taskCreated.task) as responseTaskDto,
            );
          } catch (e) {
            //TODO: Manage error
            throw e;
          }
        }

        case TaskType.PickupAndDelivery.toString(): {
          const pickupDeliveryTask = taskDto as requestPickupDeliveryTaskDto;
          const taskOrError = PickupDeliveryTask.create({
            taskId: pickupDeliveryTask.taskId,
            user: pickupDeliveryTask.user,
            taskType: (pickupDeliveryTask.taskType as unknown) as TaskType,
            taskStatus: (pickupDeliveryTask.taskStatus as unknown) as TaskStatus,
            pickupRoomId: pickupDeliveryTask.pickupRoomId,
            deliveryRoomId: pickupDeliveryTask.deliveryRoomId,
            deliveryConfirmationCode:
              pickupDeliveryTask.deliveryConfirmationCode,
            description: pickupDeliveryTask.description,
          });

          if (taskOrError.isFailure) {
            throw Result.fail<responseTaskDto>(taskOrError.errorValue());
          }

          try {
            const taskCreated = await this.taskRepo.save(
              taskOrError.getValue(),
            );
            return Result.ok<responseTaskDto>(
              TaskMapper.toDto(taskCreated.task) as responseTaskDto,
            );
          } catch (e) {
            //TODO: Manage error
            throw e;
          }
        }

        default:
          return Result.fail<responseTaskDto>('Unsupported task type');
      }
    } catch (e) {
      throw e;
    }
  }

  public async update(
    taskDto: requestSurveillanceTaskDto | requestPickupDeliveryTaskDto,
  ): Promise<Result<responseTaskDto>> {
    try {
      if (!(await this.taskRepo.exists(taskDto.taskId))) {
        return Result.fail('Task not found');
      }

      switch (taskDto.taskType) {
        case TaskType.Surveillance.toString(): {
          let task = (await this.taskRepo.findByTaskId(
            taskDto.taskId,
          )) as SurveillanceTask;
          const surveillanceTask = taskDto as requestSurveillanceTaskDto;
          const taskOrError = SurveillanceTask.create({
            taskId: surveillanceTask.taskId,
            user: surveillanceTask.user ?? task.user,
            taskType:
              ((surveillanceTask.taskType as unknown) as TaskType) ?? task.type,
            taskStatus:
              ((surveillanceTask.taskStatus as unknown) as TaskStatus) ??
              task.status,
            buildingId: surveillanceTask.buildingId ?? task.buildingId,
            floorId: surveillanceTask.floorId ?? task.floorId,
            emergencyContact:
              surveillanceTask.emergencyContact ?? task.emergencyContact,
          });

          if (taskOrError.isFailure) {
            throw Result.fail<responseTaskDto>(taskOrError.errorValue());
          }

          try {
            const taskCreated = await this.taskRepo.update(
              taskOrError.getValue(),
            );
            return Result.ok<responseTaskDto>(
              TaskMapper.toDto(taskCreated) as responseTaskDto,
            );
          } catch (e) {
            //TODO: Manage error
            throw e;
          }
        }

        case TaskType.PickupAndDelivery.toString(): {
          let task = (await this.taskRepo.findByTaskId(
            taskDto.taskId,
          )) as PickupDeliveryTask;
          const pickupDeliveryTask = taskDto as requestPickupDeliveryTaskDto;
          const taskOrError = PickupDeliveryTask.create({
            taskId: pickupDeliveryTask.taskId,
            user: pickupDeliveryTask.user ?? task.user,
            taskType:
              ((pickupDeliveryTask.taskType as unknown) as TaskType) ??
              task.type,
            taskStatus:
              ((pickupDeliveryTask.taskStatus as unknown) as TaskStatus) ??
              task.status,
            pickupRoomId: pickupDeliveryTask.pickupRoomId ?? task.pickupRoomId,
            deliveryRoomId:
              pickupDeliveryTask.deliveryRoomId ?? task.deliveryRoomId,
            deliveryConfirmationCode:
              pickupDeliveryTask.deliveryConfirmationCode ??
              task.deliveryConfirmationCode,
            description: pickupDeliveryTask.description ?? task.description,
          });

          if (taskOrError.isFailure) {
            throw Result.fail<responseTaskDto>(taskOrError.errorValue());
          }

          try {
            const taskCreated = await this.taskRepo.update(
              taskOrError.getValue(),
            );
            return Result.ok<responseTaskDto>(
              TaskMapper.toDto(taskCreated) as responseTaskDto,
            );
          } catch (e) {
            //TODO: Manage error
            throw e;
          }
        }

        default:
          return Result.fail<responseTaskDto>('Unsupported task type');
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllTasks(): Promise<Result<responseTaskDto[]>> {
    try {
      let tasks = await this.taskRepo.getAllTasks();

      if (tasks === null) {
        return Result.fail('No task found');
      }
      const taskDTOResult = tasks.map(item => TaskMapper.toDto(item));

      return Result.ok<responseTaskDto[]>(taskDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async approveTask(taskId: string): Promise<Result<responseTaskDto>> {
    try {
      const existingTask = await this.taskRepo.findByTaskId(taskId);

      if (!existingTask) {
        return Result.fail<responseTaskDto>('Task not found');
      }

      // Verifique se a tarefa já foi aprovada
      if (existingTask.status === TaskStatus.Approved) {
        return Result.fail<responseTaskDto>('Task is already approved');
      }

      // Atualize o status da tarefa para aprovado
      existingTask.updateStatus(TaskStatus.Approved);

      // Salve a tarefa atualizada no repositório
      const updatedTask = await this.taskRepo.update(existingTask);

      return Result.ok<responseTaskDto>(
        TaskMapper.toDto(updatedTask) as responseTaskDto,
      );
    } catch (e) {
      //TODO: Gerenciar erro
      throw e;
    }
  }

  public async rejectTask(taskId: string): Promise<Result<responseTaskDto>> {
    try {
      const existingTask = await this.taskRepo.findByTaskId(taskId);

      if (!existingTask) {
        return Result.fail<responseTaskDto>('Task not found');
      }

      if (existingTask.status === TaskStatus.Rejected) {
        return Result.fail<responseTaskDto>('Task is already rejected');
      }
      2;

      existingTask.updateStatus(TaskStatus.Rejected);

      const updatedTask = await this.taskRepo.update(existingTask);

      return Result.ok<responseTaskDto>(
        TaskMapper.toDto(updatedTask) as responseTaskDto,
      );
    } catch (e) {
      //TODO: Gerenciar erro
      throw e;
    }
  }

  public async getUnapprovedTasks(): Promise<Result<responseTaskDto[]>> {
    try {
      const unapprovedTasks = await this.taskRepo.getTasksByStatus(
        TaskStatus.Pending,
      );
      if (unapprovedTasks.length === 0) {
        return Result.fail<responseTaskDto[]>('No unapproved tasks found');
      }
      // Mapeie as tarefas para DTOs
      const taskDTOResult = unapprovedTasks.map(item => TaskMapper.toDto(item));
      return Result.ok<responseTaskDto[]>(taskDTOResult);
    } catch (e) {
      //TODO: Gerenciar erro
      throw e;
    }
  }

  public async getApprovedTasksSequence(): Promise<Result<responseTaskDto[]>> {
    try {
      const approvedTasks = await this.taskRepo.getTasksByStatus(
        TaskStatus.Approved,
      );

      if (approvedTasks.length === 0) {
        return Result.fail<responseTaskDto[]>('No approved tasks found');
      }

      approvedTasks.sort(
        (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
      );

      const taskDTOResult = approvedTasks.map(item => TaskMapper.toDto(item));

      return Result.ok<responseTaskDto[]>(taskDTOResult);
    } catch (e) {
      //TODO: Gerenciar erro
      throw e;
    }
  }
}
