import { Passage } from '../../domain/passage';
import { PassageId } from '../../domain/passageId';
import { FilterQuery } from 'mongoose';

export default interface IPassageRepo {
  save(passage: Passage): Promise<PassageId>;
  update(passage: Partial<Omit<Passage, 'id'>>, filter: FilterQuery<Passage>): Promise<number>;
}
