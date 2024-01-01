import { NextFunction, Request, Response } from "express";
import RoomController from "../../src/controllers/roomController";
import IRoomService from "../../src/repos/IRepos/IRoomService";
import { Result } from "../../src/core/logic/Result";
import mocks from "../mocks";

describe('RoomController', () => {
  let roomController: RoomController;
  let mockRoomService: jest.Mocked<IRoomService>;
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
    mockRoomService = {
      save: jest.fn(),
    } as any;
    roomController = new RoomController(mockRoomService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRoom', () => {
    it('should call `roomServiceInstance.save`', async () => {
      mockReq.body = mocks.buildRoomDto();

      jest.spyOn(mockRoomService, 'save').mockResolvedValue(Result.ok<{ roomId: string }>({roomId: 'test-id'}) as any )

      await roomController.createRoom(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRoomService.save).toHaveBeenCalledTimes(1);
      expect(mockRoomService.save).toHaveBeenCalledWith(mocks.buildRoomDto());
    });

    it('should return error if room is not saved', async () => {
      mockReq.body = mocks.buildRoomDto();

      jest.spyOn(mockRoomService, 'save').mockResolvedValue(Result.fail('test-error') as any )
      jest.spyOn(roomController, 'fail').mockImplementation(jest.fn() as any);

      const result = await roomController.createRoom(mockReq as Request, mockRes as Response, mockNext);

      expect(roomController.fail).toHaveBeenCalledWith('test-error');
    });
  });
});
