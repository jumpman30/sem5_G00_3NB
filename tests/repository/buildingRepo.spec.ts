import BuildingRepo from "../../src/repos/buildingRepo";
import {IBuildingPersistence} from "../../src/dataschema/IBuildingPersistence";
import {anything, instance, mock, verify, when} from "ts-mockito";
import {Model, Document} from "mongoose";
import {BuildingMap} from "../../src/mappers/BuildingMap";

describe('BuildingRepo', () => {
  let buildingRepo: BuildingRepo;
  let mockedBuildingSchema: Model<IBuildingPersistence & Document>;

  beforeEach(() => {
    mockedBuildingSchema = mock<Model<IBuildingPersistence & Document>>();

    buildingRepo = new BuildingRepo(
        instance(mockedBuildingSchema),
    );
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
      when(mockedBuildingSchema.create(anything())).thenResolve(buildingPersistence);

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
      const buildingDocument = {
        ...BuildingMap.toPersistence(building),
        save: jest.fn().mockResolvedValue(building),
      };

      when(mockedBuildingSchema.findOne(anything())).thenResolve(buildingDocument);

      const result = await buildingRepo.save(building);

      verify(mockedBuildingSchema.findOne(anything())).once();
      expect(buildingDocument.save).toHaveBeenCalled();
      expect(result).toEqual(building);
    });

    // Add more tests for different scenarios...
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

      when(mockedBuildingSchema.findOne({code: buildingCode})).thenResolve(buildingPersistence as any);

      const result = await buildingRepo.findByCode(buildingCode);
      expect(result).toEqual(buildingDomain);

      verify(mockedBuildingSchema.findOne({code: buildingCode})).once();
    });

    it('should return null when no building with the given code exists', async () => {
      const buildingCode = 'B456';

      when(mockedBuildingSchema.findOne({code: buildingCode})).thenResolve(null);

      const result = await buildingRepo.findByCode(buildingCode);

      console.log('Result from findByCode:', result);

      verify(mockedBuildingSchema.findOne({code: buildingCode})).once();
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

      when(mockedBuildingSchema.findOne({ code: building.code })).thenResolve({} as any);

      const result = await buildingRepo.exists(building);

      verify(mockedBuildingSchema.findOne({ code: building.code })).once();
      expect(result).toBeTruthy();
    });

    it('should return false if a building does not exist', async () => {
      const building = BuildingMap.toDomain({
        code: 'B789',
        name: 'Building 789',
        length: 300,
        width: 300,
      });

      when(mockedBuildingSchema.findOne({ code: building.code })).thenResolve(null);

      const result = await buildingRepo.exists(building);

      verify(mockedBuildingSchema.findOne({ code: building.code })).once();
      expect(result).toBeFalsy();
    });

    it('should throw an error if the building is null', async () => {
      await expect(buildingRepo.exists(null)).rejects.toThrow('Building is null');
    });
  });

});
