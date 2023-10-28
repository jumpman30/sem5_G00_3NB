import { RoomId } from '../../src/domain/roomId';
import { Location } from '../../src/domain/location';
import { Room } from '../../src/domain/room';
import { FloorId } from '../../src/domain/floorId';

const buildRoom = (data?: Partial<Room>) => {
  return  {
    id: new RoomId('test'),
    buildingId: 'test',
    designation: 'test',
    doorLocation: Location.create('test', 'test').getValue(),
    floorId: 'test',
    location: Location.create('test', 'test').getValue(),
    ...data
  };
}

const buildRoomDto = (data?) => {
  return  {
    buildingId: 'test',
    designation: 'test',
    doorLocation: {x: 'test', y: 'test'},
    floorId: 'test',
    location: {x: 'test', y: 'test'},
    ...data
  }
}

const buildFloor = (data?) => {
  return {
    id: new FloorId('test'),
    buildingId: 'test',
    number: 'test',
      ...data
  }
};

const buildFloorDto = (data?) => {
  return {
    buildingId: 'test',
    number: 'test',
    ...data
  }
};


export default { buildRoom, buildRoomDto, buildFloor, buildFloorDto }
