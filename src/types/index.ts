import { Passage } from '../domain/passage';

//We can add more keys to this type in case we desire to implement a deeper filter
export type UpdateBuildingFilter = {
  domainId: string
};


export type PassageDbProjection = {
  locationBuilding1: number;
  locationBuilding2: number;
  floor1Id: number;
}
