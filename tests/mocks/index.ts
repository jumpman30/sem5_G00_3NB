import { RoomId } from '../../src/domain/room/roomId';
import { Location } from '../../src/domain/room/location';
import { Room } from '../../src/domain/room/room';
import { FloorId } from '../../src/domain/floor/floorId';
import { PassageId } from '../../src/domain/passage/passageId';
import {BuildingCode} from "../../src/domain/building/BuildingCode";
import { Building } from "../../src/domain/building/Building";

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

const buildPassage = (data?) => {
  return {
    id: new PassageId('test'),
    building1Id: 't1',
    building2Id: 't2',
    floor1Id: 'test-floor1Id',
    floor2Id: 'test-floor2Id',
    locationBuilding1: [
      {
        x: '3',
        y: '3'
      }
    ],
    locationBuilding2: [
      {
        x: '3',
        y: '3'
      }
    ],
    ...data
  }
};

const buildPassageDto = (data?) => {
  return {
    building1Id: 't1',
    building2Id: 't2',
    floor1Id: 'test-floor1Id',
    floor2Id: 'test-floor2Id',
    locationBuilding1:  [
      {
        x: '3',
        y: '3'
      }
    ],
    locationBuilding2: [
      {
        x: '3',
        y: '3'
      }
    ],
    ...data
  }
};

const buildBuilding = (data?) => {
  return Building.create({
    id: 'test',
    name: 'test',
    length: 'test',
    width: 'test',
    ...data
  })
};

const buildBuildingDto = (data?) => {
  return {
    name: 'test',
    length: 'test',
    width: 'test',
    ...data
  }
};

const buildFloorDto = (data?) => {
  return {
    buildingId: 'test',
    number: 'test',
    minimum: 1,
    maximum: 4,
    ...data
  }
};


export default {
  buildRoom,
  buildRoomDto,
  buildFloor,
  buildFloorDto,
  buildBuilding,
  buildBuildingDto,
  buildPassage,
  buildPassageDto
}
