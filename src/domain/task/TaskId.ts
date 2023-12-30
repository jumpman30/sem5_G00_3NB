import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

export class TaskId extends UniqueEntityID {
  private constructor(id?: string) {
    super(id);
  }

  public static create(taskId?: string): TaskId {
    return new TaskId(taskId);
  }
}
