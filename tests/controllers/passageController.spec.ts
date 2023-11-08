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
      update: jest.fn(),
      findPassageBetweenBuildings: jest.fn()
    } as any;
    passageController = new PassageController(mockPassageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call `passageService.save`', async () => {
      mockReq.body = mocks.buildPassageDto();

      jest.spyOn(mockPassageService, 'save').mockResolvedValue(Result.ok<{ roomId: string }>({roomId: 'test-id'}) as any )

      await passageController.createPassage(mockReq as Request, mockRes as Response, mockNext);

      expect(mockPassageService.save).toHaveBeenCalledTimes(1);
      expect(mockPassageService.save).toHaveBeenCalledWith(mocks.buildPassageDto());
    });

    it('should return error if passage is not saved', async () => {
      mockReq.body = mocks.buildPassageDto();

      jest.spyOn(mockPassageService, 'save').mockResolvedValue(Result.fail('test-error') as any )
      jest.spyOn(passageController, 'fail').mockImplementation(jest.fn() as any);

      const result = await passageController.createPassage(mockReq as Request, mockRes as Response, mockNext);

      expect(passageController.fail).toHaveBeenCalledWith('test-error');
    });
  });

  describe('updatePassageByDomainId', () => {
    it.skip('should call `passageService.update`', async () => {
      mockReq.params = {
        code: 'test-id'
      };
      mockReq.body = mocks.buildPassageDto();

      jest.spyOn(mockPassageService, 'update').mockResolvedValue(Result.ok<{ updatedCount: number }>({updatedCount: 3}) as any )

      await passageController.updatePassageByDomainId(mockReq as Request, mockRes as Response, mockNext);

      expect(mockPassageService.update).toHaveBeenCalledTimes(1);
      expect(mockPassageService.update).toHaveBeenCalledWith(mocks.buildPassageDto(), {code: 'test-id'});
    });

    it('should return an error if passage is not updated', async () => {
      mockReq.body = mocks.buildPassageDto();
      mockReq.params = {
        code: 'test-id'
      };

      jest.spyOn(mockPassageService, 'update').mockResolvedValue(Result.fail('test-error') as any )
      jest.spyOn(passageController, 'fail').mockImplementation(jest.fn() as any);

      const result = await passageController.updatePassageByDomainId(mockReq as Request, mockRes as Response, mockNext);

      expect(passageController.fail).toHaveBeenCalledWith('test-error');
    });
  });

  describe('findPassagesBetweenTwoBuildings', () => {
    it('should call `passageService.findPassageBetweenBuildings`', async () => {
     mockReq.body = {
         searchBuildingId1: 'test',
         searchBuildingId2: 'test'
      }

      jest.spyOn(mockPassageService, 'findPassageBetweenBuildings').mockResolvedValue(Result.ok<{ roomId: string }>({roomId: 'test-id'}) as any )
      jest.spyOn(passageController, 'ok').mockResolvedValue(jest.fn() as any);

      await passageController.findPassagesBetweenTwoBuildings(mockReq as Request, mockRes as Response, mockNext);

      expect(mockPassageService.findPassageBetweenBuildings).toHaveBeenCalledTimes(1);
      expect(mockPassageService.findPassageBetweenBuildings).toHaveBeenCalledWith('test', 'test');
    });

    it('should return an error if passage is not updated', async () => {
      mockReq.body = {
        searchBuildingId1: 'test',
        searchBuildingId2: 'test'
      }

      jest.spyOn(mockPassageService, 'findPassageBetweenBuildings').mockResolvedValue(Result.fail('test-error') as any )
      jest.spyOn(passageController, 'fail').mockImplementation(jest.fn() as any);

      const result = await passageController.findPassagesBetweenTwoBuildings(mockReq as Request, mockRes as Response, mockNext);

      expect(passageController.fail).toHaveBeenCalledWith('test-error');
    });
  });
});
