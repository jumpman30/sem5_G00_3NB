import { NextFunction, Request, Response } from 'express';
import { Result } from '../../src/core/logic/Result';
import mocks from '../mocks';
import FloorController from '../../src/controllers/floorController';
import IFloorService from '../../src/services/IServices/IFloorService';

describe('FloorController', () => {
  let floorController: FloorController;
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
    mockFloorService = {
      save: jest.fn(),
    } as any;
    floorController = new FloorController(mockFloorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRoom', () => {
    it('should call `floorService.save`', async () => {
      mockReq.body = mocks.buildFloorDto();

      jest.spyOn(mockFloorService, 'save').mockResolvedValue(Result.ok<{ roomId: string }>({roomId: 'test-id'}) as any )

      await floorController.createFloor(mockReq as Request, mockRes as Response, mockNext);

      expect(mockFloorService.save).toHaveBeenCalledTimes(1);
      expect(mockFloorService.save).toHaveBeenCalledWith(mocks.buildFloorDto());
    });

    it('should return error if room is not saved', async () => {
      mockReq.body = mocks.buildRoomDto();

      jest.spyOn(mockFloorService, 'save').mockResolvedValue(Result.fail('test-error') as any )
      jest.spyOn(floorController, 'fail').mockImplementation(jest.fn() as any);

      const result = await floorController.createFloor(mockReq as Request, mockRes as Response, mockNext);

      expect(floorController.fail).toHaveBeenCalledWith('test-error');
    });
  });
});
