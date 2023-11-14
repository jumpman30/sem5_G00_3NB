import { Passage } from '../../domain/passage';
import { PassageId } from '../../domain/passageId';
import { FilterQuery } from 'mongoose';
import { PassageDbProjection } from '../../types';

export default interface IPassageRepo {
  save(passage: Passage): Promise<PassageId>;
  update(passage: Partial<Omit<Passage, 'id'>>, filter: FilterQuery<Passage>): Promise<number>;
  findByBuilding (buildingId: string): Promise<Passage[]>;
  find(filter: FilterQuery<Passage>, projection?: PassageDbProjection): Promise<Partial<Passage>[]>

}
