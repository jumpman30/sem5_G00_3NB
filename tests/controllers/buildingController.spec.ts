import { NextFunction, Request, Response } from 'express';
import RoomController from '../../src/controllers/roomController';
import IRoomService from '../../src/services/IRepos/IRoomService';
import { Result } from '../../src/core/logic/Result';
import mocks from '../mocks';
import FloorController from '../../src/controllers/floorController';
import IFloorService from '../../src/services/IServices/IFloorService';
import BuildingController from '../../src/controllers/buildingController';
import IBuildingService from '../../src/services/IServices/IBuildingService';

describe('FloorController', () => {
  let buildingController: BuildingController;
  let mockBuildingService: jest.Mocked<IBuildingService>;
  let mockFloorService: jest.Mocked<IFloorService>;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      body: {}
    };
    mockRes = {
      status: jest.fn(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mockBuildingService = {
      save: jest.fn(),
    } as any;
    mockFloorService = {
      save: jest.fn(),
    } as any;
   
    buildingController = new BuildingController(mockBuildingService,mockFloorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRoom', () => {
    it('should call `floorService.save`', async () => {
      mockReq.body = mocks.buildBuildingDto();

      jest.spyOn(mockBuildingService, 'save').mockResolvedValue(Result.ok<{ roomId: string }>({roomId: 'test-id'}) as any )

      await buildingController.createBuilding(mockReq as Request, mockRes as Response, mockNext);

      expect(mockBuildingService.save).toHaveBeenCalledTimes(1);
      expect(mockBuildingService.save).toHaveBeenCalledWith(mocks.buildBuildingDto());
    });

    it('should return error if room is not saved', async () => {
      mockReq.body = mocks.buildBuildingDto();

      jest.spyOn(mockBuildingService, 'save').mockResolvedValue(Result.fail('test-error') as any )
      jest.spyOn(buildingController, 'fail').mockImplementation(jest.fn() as any);

      const result = await buildingController.createBuilding(mockReq as Request, mockRes as Response, mockNext);

      expect(buildingController.fail).toHaveBeenCalledWith('test-error');
    });
  });
});
