import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const floorSchema = {
    // compare with the approach followed in repos and services
    name: 'floorSchema',
    schema: '../persistence/schemas/floorSchema',
  };

  const passageSchema = {
    // compare with the approach followed in repos and services
    name: 'passageSchema',
    schema: '../persistence/schemas/passageSchema',
  };

  const roomSchema = {
    name: 'roomSchema',
    schema: '../persistence/schemas/roomSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const robotSchema = {
    // compare with the approach followed in repos and services
    name: 'robotSchema',
    schema: '../persistence/schemas/robotSchema',
  }

  const robotTypeSchema = {
    name: 'RobotTypeSchema',
    schema: '../persistence/schemas/robotTypeSchema',
  };

  const buildingSchema = {
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path,
  };

  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path,
  };

  const roomController = {
    name: config.controllers.room.name,
    path: config.controllers.room.path,
  };

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path,
  };

  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path,
  };

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path,
  };

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path,
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path,
  };

  const roomRepo = {
    name: config.repos.room.name,
    path: config.repos.room.path,
  };

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path,
  };


  const passageRepo = {
    name: config.repos.passage.name,
    path: config.repos.passage.path,
  };

  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path,
  };

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path,
  };

  const roomService = {
    name: config.services.room.name,
    path: config.services.room.path,
  };

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path,
  }

  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path,
  }

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path,
  }

  const robotTypeController = {
    name: config.controllers.robotType.name,
    path: config.controllers.robotType.path,
  };

  const passageController = {
    name: config.controllers.passage.name,
    path: config.controllers.passage.path,
  };

  const robotTypeRepo = {
    name: config.repos.robotType.name,
    path: config.repos.robotType.path,
  };

  const robotTypeService = {
    name: config.services.robotType.name,
    path: config.services.robotType.path,
  };

  const passageService = {
    name: config.services.passage.name,
    path: config.services.passage.path,
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [userSchema, roleSchema, roomSchema, robotSchema, robotTypeSchema, floorSchema, buildingSchema, passageSchema],
    controllers: [roleController, roomController, robotController, robotTypeController, floorController, buildingController, passageController],
    repos: [roleRepo, userRepo, roomRepo, robotRepo, robotTypeRepo, floorRepo, buildingRepo, passageRepo],
    services: [roleService, roomService, robotService, robotTypeService, floorService, buildingService, passageService]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
