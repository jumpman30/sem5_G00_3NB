import { Task } from '../../domain/task/Task';
import { TaskType } from '../../domain/task/TaskType';
import { TaskId } from '../../domain/task/TaskId';
import { TaskStatus } from '../../domain/task/taskStatus';

export default interface ITaskRepo {
  save(task: Task): Promise<{ warning?: string; task: Task }>;
  exists(task: TaskId | string): Promise<boolean>;
  getAllTasks(): Promise<Task[]>;
  update(task: Task): Promise<Task>;
  findByTaskType(taskType: TaskType | string): Promise<Task>;
  findByTaskId(taskId: TaskId | string): Promise<Task>;
  delete(task: Task): Promise<Task | null>;
  getTasksByStatus(status: TaskStatus): Promise<Task[]>;
}
