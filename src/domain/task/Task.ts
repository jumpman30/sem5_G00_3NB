import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { TaskId } from './TaskId';
import { TaskStatus } from './taskStatus';
import { TaskType } from './TaskType';

export interface TaskProps {
  taskId?: string;
  user: string;
  taskType: TaskType;
  taskStatus: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task extends AggregateRoot<TaskProps> {
  get id(): TaskId {
    return this._id;
  }

  get type(): TaskType {
    return this.props.taskType;
  }

  get status(): TaskStatus {
    return this.props.taskStatus;
  }

  get taskId(): string {
    return this.props.taskId;
  }

  get user(): string {
    return this.props.user;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  protected constructor(props: TaskProps, id: TaskId) {
    super(props, id);
  }

  public static create(props: TaskProps, id: TaskId): Result<Task> {
    const guardedProps = [
      { argument: props.taskType, argumentName: 'type' },
      { argument: props.taskStatus, argumentName: 'status' },
      { argument: props.user, argumentName: 'user' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Task>(guardResult.message);
    } else {
      const task = new Task(props, id);

      return Result.ok<Task>(task);
    }
  }

}
