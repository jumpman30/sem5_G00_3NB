import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/lapr5_db',

  /**
   * Your secret sauce
   */
  jwtSecret:
    process.env.JWT_SECRET || 'my sakdfho2390asjod$%jl)!sdjas0i secret',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  /**
   * Controllers
   */
  controllers: {
    user: {
      name: 'UserController',
      path: '../controllers/userController',
    },
    role: {
      name: 'RoleController',
      path: '../controllers/roleController',
    },
    health: {
      name: 'HealthController',
      path: '../controllers/healthController',
    },
    building: {
      name: 'BuildingController',
      path: '../controllers/buildingController',
    },
    floor: {
      name: 'FloorController',
      path: '../controllers/floorController',
    },
    elevator: {
      name: 'ElevatorController',
      path: '../controllers/elevatorController',
    },
    passage: {
      name: 'PassageController',
      path: '../controllers/passageController',
    },
    room: {
      name: 'RoomController',
      path: '../controllers/roomController',
    },
    robot: {
      name: 'RobotController',
      path: '../controllers/robotController',
    },
    robotType: {
      name: 'RobotTypeController',
      path: '../controllers/robotTypeController',
    },
  },
  /**
   * Repositories
   */
  repos: {
    user: {
      name: 'UserRepo',
      path: '../repos/userRepo',
    },
    role: {
      name: 'RoleRepo',
      path: '../repos/roleRepo',
    },
    building: {
      name: 'buildingRepo',
      path: '../repos/buildingRepo',
    },
    floor: {
      name: 'FloorRepo',
      path: '../repos/floorRepo',
    },
    elevator: {
      name: 'ElevatorRepo',
      path: '../repos/elevatorRepo',
    },
    passage: {
      name: 'PassageRepo',
      path: '../repos/passageRepo',
    },
    room: {
      name: 'RoomRepo',
      path: '../repos/roomRepo',
    },
    robot: {
      name: 'RobotRepo',
      path: '../repos/robotRepo',
    },
    robotType: {
      name: 'RobotTypeRepo',
      path: '../repos/robotTypeRepo',
    },
  },
  /**
   * Services
   */
  services: {
    user: {
      name: 'UserService',
      path: '../services/userService',
    },
    role: {
      name: 'RoleService',
      path: '../services/roleService',
    },
    building: {
      name: 'BuildingService',
      path: '../services/buildingService',
    },
    floor: {
      name: 'FloorService',
      path: '../services/floorService',
    },
    elevator: {
      name: 'ElevatorService',
      path: '../services/elevatorService',
    },
    passage: {
      name: 'PassageService',
      path: '../services/passageService',
    },
    room: {
      name: 'RoomService',
      path: '../services/roomService',
    },
    robot: {
      name: 'RobotService',
      path: '../services/robotService',
    },
    robotType: {
      name: 'RobotTypeService',
      path: '../services/robotTypeService',
    },
  },
};
