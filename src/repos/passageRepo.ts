import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';
import IPassageRepo from '../services/IRepos/IPassageRepo';
import { Passage } from '../domain/passage';
import { PassageId } from '../domain/passageId';
import { PassageMap } from '../mappers/PassageMap';

@Service()
export default class PassageRepo implements IPassageRepo {
  constructor(
    @Inject('passageSchema')
    private passageSchema: Model<IPassagePersistence & Document>,
    @Inject('logger') private logger,
  ) {}

  public async save(passage: Passage): Promise<PassageId> {
    const rawPassage: any = PassageMap.toPersistence(passage);

    try {
      const passageDb = await this.passageSchema.create(rawPassage);
      return new PassageId(passageDb.domainId);
    } catch (e) {
      throw e;
    }
  }

  public async update(passage: Partial<Omit<Passage, 'id'>>, filter: FilterQuery<Passage>): Promise<number> {
    try {
      const result = await this.passageSchema.updateOne(filter, passage);
      return result.modifiedCount;
    } catch (e) {
      throw e;
    }
  }


  public async findByBuilding(buildingId: string): Promise<Passage[]> {
    const query = { 
      $or: [
        { building1Id: buildingId },
        { building2Id: buildingId }
     ]};

    const passages = (await this.passageSchema.find( query ));
    if(passages) {
      return passages.map(passage => PassageMap.toDomain(passage));
    }
    else{
      return null;
    }
  }
}
