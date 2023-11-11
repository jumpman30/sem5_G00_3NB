import BuildingRepo from '../../src/repos/buildingRepo';
import { IBuildingPersistence } from '../../src/dataschema/IBuildingPersistence';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { Model, Document } from 'mongoose';
import { BuildingMap } from '../../src/mappers/BuildingMap';
import { after } from "lodash";

describe('BuildingRepo', () => {
  let buildingRepo: BuildingRepo;
  let mockedBuildingSchema: Model<IBuildingPersistence & Document>;

  beforeEach(() => {
    mockedBuildingSchema = mock<Model<IBuildingPersistence & Document>>();

    buildingRepo = new BuildingRepo(instance(mockedBuildingSchema));
  });

  describe('save', () => {
    it('should create a new building if it does not exist', async () => {
      const building = BuildingMap.toDomain({
        code: 'B123',
        name: 'Building 123',
        length: 100,
        width: 100,
      });
      const buildingPersistence = BuildingMap.toPersistence(building);

      when(mockedBuildingSchema.findOne(anything())).thenResolve(null);
      when(mockedBuildingSchema.create(anything())).thenResolve(
        buildingPersistence,
      );

      const result = await buildingRepo.save(building);

      verify(mockedBuildingSchema.findOne(anything())).once();
      verify(mockedBuildingSchema.create(anything())).once();
      expect(result).toEqual(building);
    });

    it('should update an existing building if it exists', async () => {
      const building = BuildingMap.toDomain({
        code: 'B123',
        name: 'Building 123',
        length: 100,
        width: 100,
      });
      const buildingDocument = BuildingMap.toPersistence(building);
      when(mockedBuildingSchema.findOne(anything())).thenResolve(
        buildingDocument,
      );

      const buildingToUpdate = BuildingMap.toDomain({
        code: 'B123',
        name: 'New Building 123',
        length: 50,
        width: 100,
      });
      const buildingToUpdateDocument = BuildingMap.toPersistence(
        buildingToUpdate,
      );
      when(
        mockedBuildingSchema.findOneAndUpdate(
          anything(),
          anything(),
          after,
        ),
      ).thenResolve(buildingToUpdateDocument);

      const result = await buildingRepo.save(buildingToUpdate);

      verify(mockedBuildingSchema.findOne(anything())).once();
      expect(result).toEqual(buildingToUpdate);
    });

    // ToDo Add more tests for different scenarios...
  });

  describe('findByCode', () => {
    it('should return a building when a building with the given code exists', async () => {
      const buildingCode = 'B123';
      const buildingPersistence = {
        code: buildingCode,
        name: 'Building 123',
        length: 100,
        width: 100,
      };
      const buildingDomain = BuildingMap.toDomain(buildingPersistence);

      when(mockedBuildingSchema.findOne(anything())).thenResolve(
        buildingPersistence as any,
      );

      const result = await buildingRepo.findByCode(buildingCode);
      expect(result).toEqual(buildingDomain);

      verify(mockedBuildingSchema.findOne(anything())).once();
    });

    it('should return null when no building with the given code exists', async () => {
      const buildingCode = 'B456';

      when(mockedBuildingSchema.findOne(anything())).thenResolve(null);

      const result = await buildingRepo.findByCode(buildingCode);

      console.log('Result from findByCode:', result);

      verify(mockedBuildingSchema.findOne(anything())).once();
      expect(result).toBeNull();
    });
  });

  describe('getAllBuildings', () => {
    it('should return all buildings', async () => {
      const buildingRecords = [
        {
          code: 'B123',
          name: 'Building 123',
          length: 100,
          width: 100,
        },
        {
          code: 'B456',
          name: 'Building 456',
          length: 200,
          width: 200,
        },
      ];
      const buildingDomains = buildingRecords.map(BuildingMap.toDomain);

      when(mockedBuildingSchema.find()).thenResolve(buildingRecords as any);

      const result = await buildingRepo.getAllBuildings();

      verify(mockedBuildingSchema.find()).once();
      expect(result).toEqual(buildingDomains);
    });

    it('should return an empty array if no buildings are found', async () => {
      when(mockedBuildingSchema.find()).thenResolve(null);

      const result = await buildingRepo.getAllBuildings();

      verify(mockedBuildingSchema.find()).once();
      expect(result).toEqual(null);
    });
  });

  describe('exists', () => {
    it('should return true if a building exists', async () => {
      const building = BuildingMap.toDomain({
        code: 'B123',
        name: 'Building 123',
        length: 100,
        width: 100,
      });
      const buildingPersistence = BuildingMap.toPersistence(building);

      when(mockedBuildingSchema.findOne(anything())).thenResolve(
        buildingPersistence as any,
      );

      const result = await buildingRepo.exists(building);

      expect(result).toBeTruthy();
    });

    it('should return false if a building does not exist', async () => {
      const building = BuildingMap.toDomain({
        code: 'B723',
        name: 'Building 723',
        length: 100,
        width: 100,
      });

      when(mockedBuildingSchema.findOne(anything())).thenResolve();

      const result = await buildingRepo.exists(building);

      expect(result).toBeFalsy();
    });

    // Add tests for getAllBuildings and exists methods
  });
});
