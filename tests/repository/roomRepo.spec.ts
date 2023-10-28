import RoomRepo from '../../src/repos/roomRepo';
import { Model } from 'mongoose';
import { IRoomPersistence } from '../../src/dataschema/IRoomPersistence';
import mocks from '../mocks';



describe('RoomRepo', () => {
  let roomRepo: RoomRepo;
  let mockRoomSchema: jest.Mocked<Model<IRoomPersistence>>;
  let mockLogger: jest.Mocked<Console>;

  beforeEach(() => {
    mockRoomSchema = {
      create: jest.fn(),
    } as any;
    mockLogger = {
      error: jest.fn(),
      log: jest.fn(),
    } as any;

    roomRepo = new RoomRepo(mockRoomSchema as any, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should call `roomSchema.create`', async () => {
      const room = mocks.buildRoom();


      jest.spyOn(mockRoomSchema, 'create').mockImplementation(jest.fn() as any);

      await roomRepo.save(room as any);

      expect(mockRoomSchema.create).toHaveBeenCalledTimes(1);
      expect(mockRoomSchema.create).toHaveBeenCalledWith({
        domainId: room.id.toString(),
        buildingId: room.buildingId,
        designation: room.designation,
        doorLocation: room.doorLocation.value,
        floorId: room.floorId,
        location: room.location.value,
      });
    });
    it('should throw an error if `roomSchema.create` fails', async () => {
      const room = mocks.buildRoom();


      jest.spyOn(mockRoomSchema, 'create').mockImplementation(() => {
        throw new Error('test-error');
      });

      try {
        await roomRepo.save(room as any);
      } catch (e){
        expect(e.message).toEqual('test-error');
      }
    });

  });
});
