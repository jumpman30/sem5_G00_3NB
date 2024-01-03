import { Result } from '../../core/logic/Result';
import {
  requestPickupDeliveryTaskDto,
  requestSurveillanceTaskDto,
  responseTaskDto,
} from '../../dto/ITaskDto';

export default interface ITaskService {
  save(
    task: requestSurveillanceTaskDto | requestPickupDeliveryTaskDto,
  ): Promise<Result<responseTaskDto>>;
  update(
    task: requestSurveillanceTaskDto | requestPickupDeliveryTaskDto,
  ): Promise<Result<responseTaskDto>>;
  getTaskById(taskId: string): Promise<Result<responseTaskDto>>;
  getAllTasks(): Promise<Result<responseTaskDto[]>>;

  approveTask(taskId: string): Promise<Result<responseTaskDto>>;
  rejectTask(taskId: string): Promise<Result<responseTaskDto>>;
}
