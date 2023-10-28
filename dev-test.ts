import { Floor } from './src/domain/floor';
import schema from './src/persistence/schemas/floorSchema';
import FloorRepo from './src/repos/floorRepo';
import LoggerInstance from './src/loaders/logger';

const floor = Floor.create({
  buildingId: 'test',
  number: '3'
});

const repo = new FloorRepo(schema, LoggerInstance);

repo.save(floor.getValue()).then();
