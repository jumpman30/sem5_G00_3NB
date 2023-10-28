import { NextFunction, Request, Response } from 'express';
import { Result } from '../../src/core/logic/Result';
import mocks from '../mocks';
import PassageController from '../../src/controllers/passageController';
import IPassageService from '../../src/services/IServices/IPassageService';

describe('PassageController', () => {
  let passageController: PassageController;
  let mockPassageService: jest.Mocked<IPassageService>;
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
    mockPassageService = {
      save: jest.fn(),
    } as any;
    passageController = new PassageController(mockPassageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRoom', () => {
    it('should call `floorService.save`', async () => {
      mockReq.body = mocks.buildPassageDto();

      jest.spyOn(mockPassageService, 'save').mockResolvedValue(Result.ok<{ roomId: string }>({roomId: 'test-id'}) as any )

      await passageController.createPassage(mockReq as Request, mockRes as Response, mockNext);

      expect(mockPassageService.save).toHaveBeenCalledTimes(1);
      expect(mockPassageService.save).toHaveBeenCalledWith(mocks.buildPassageDto());
    });

    it('should return error if room is not saved', async () => {
      mockReq.body = mocks.buildPassageDto();

      jest.spyOn(mockPassageService, 'save').mockResolvedValue(Result.fail('test-error') as any )
      jest.spyOn(passageController, 'fail').mockImplementation(jest.fn() as any);

      const result = await passageController.createPassage(mockReq as Request, mockRes as Response, mockNext);

      expect(passageController.fail).toHaveBeenCalledWith('test-error');
    });
  });
});
