import RoomService from '../../src/services/roomService';
import IRoomRepo from '../../src/services/IRepos/IRoomRepo';
import mocks from '../mocks';

describe('RoomService', () => {
  let roomService: RoomService;
  let mockRoomRepo: jest.Mocked<IRoomRepo>;
  let mockLogger: jest.Mocked<Console>;

  beforeEach(() => {
    mockRoomRepo = {
      save: jest.fn(),
    } as any;
    mockLogger = {
      error: jest.fn(),
      log: jest.fn(),
    } as any;

    roomService = new RoomService(mockRoomRepo, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {

    it('should throw an error if it fails to build a location', async () => {
      const mockRoomDto = mocks.buildRoomDto({
        location: {}
      });

      try {
        await roomService.save(mockRoomDto);
      } catch (e) {
        expect(e.message).toEqual('Invalid location coordinates');
      }
    });

    it('should throw an error if it fails to build a room', async () => {
      const mockRoomDto = mocks.buildRoomDto({
        designation: undefined
      });

      try {
        await roomService.save(mockRoomDto);
      } catch (e) {
        expect(e.error).toEqual('designation is null or undefined');
      }
    });

    it(' should call `roomRepo.save`', async () => {
      const mockRoomDto = mocks.buildRoomDto();

      jest.spyOn(mockRoomRepo, 'save').mockResolvedValue('test-id' as any);

      await roomService.save(mockRoomDto);

      expect(mockRoomRepo.save).toHaveBeenCalledTimes(1)
    });
  });
});
