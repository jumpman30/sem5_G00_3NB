import { Passage } from '../../domain/passage';
import { PassageId } from '../../domain/passageId';

export default interface IPassageRepo {
  save(passage: Passage): Promise<PassageId>;
}
