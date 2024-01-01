import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

export class BuildingId extends UniqueEntityID {
  private constructor(id?: string) {
    super(id);
  }

  public static create(domainId: string): BuildingId {
    return new BuildingId(domainId);
  }
}
