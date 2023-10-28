import { Repo } from '../../core/infra/Repo';
import { Building } from '../../domain/Building';

export default interface IBuildingRepo extends Repo<Building> {
  save(user: Building): Promise<Building>;
  findByCode(code: string): Promise<Building>;
  getAll(): Promise<Building[]>;
  
}
