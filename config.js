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
  port: parseInt(process.env.PORT, 10) || 3030,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || 'mongodb://mongoadmin:ff3fbc9043e61f288b28abbd@vsgate-s1.dei.isep.ipp.pt:10717/admin',

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || 'my sakdfho2390asjod$%jl)!sdjas0i secret',

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
   * Controllers configs
   */
  controllers: {
    role: {
      name: 'RoleController',
      path: '../controllers/roleController',
    },
    health: {
      name: 'HealthController',
      path: '../controllers/healthController',
    },
    passage: {
      name: 'PassageController',
      path: '../controllers/passageController',
    },
    building: {
      name: 'BuildingController',
      path: '../controllers/buildingController',
    },
    floor: {
      name: 'FloorController',
      path: '../controllers/floorController',
    },
    floorMap: {
      name: 'FloorMapController',
      path: '../controllers/floorMapController',
    },
    room: {
      name: 'RoomController',
      path: '../controllers/roomController',
    },
    robot: {
      name: "RobotController",
      path: "../controllers/robotController"
    },
    robotType: {
      name: 'RobotTypeController',
      path: '../controllers/robotTypeController',
    },
    elevator: {
      name: 'ElevatorController',
      path: '../controllers/elevatorController',
    },
    task: {
      name: 'TaskController',
      path: '../controllers/taskController',
    },
  },
  /**
   * Repos configs
   */
  repos: {
    role: {
      name: 'RoleRepo',
      path: '../repos/roleRepo',
    },
    passage: {
      name: 'PassageRepo',
      path: '../repos/passageRepo',
    },
    building: {
      name: 'BuildingRepo',
      path: '../repos/buildingRepo',
    },
    user: {
      name: 'UserRepo',
      path: '../repos/userRepo',
    },
    robot: {
      name: "RobotRepo",
      path: "../repos/robotRepo"
    },
    robotType: {
      name: 'RobotTypeRepo',
      path: '../repos/robotTypeRepo',
    },
    room: {
      name: 'RoomRepo',
      path: '../repos/roomRepo'
    },
    floor: {
      name: 'FloorRepo',
      path: '../repos/floorRepo',
    },
    floorMap: {
      name: 'FloorMapRepo',
      path: '../repos/floorMapRepo',
    },
    elevator: {
      name: 'ElevatorRepo',
      path: '../repos/elevatorRepo',
    },
    task: {
      name: 'TaskRepo',
      path: '../repos/taskRepo',
    },
  },
  /**
   * Services configs
   */
  services: {
    role: {
      name: 'RoleService',
      path: '../services/roleService',
    },
    passage: {
      name: 'PassageService',
      path: '../services/passageService',
    },
    building: {
      name: 'BuildingService',
      path: '../services/buildingService',
    },
    room: {
      name: 'RoomService',
      path: '../services/roomService',
    },
    robot: {
      name: "RobotService",
      path: "../services/robotService"
    },
    robotType: {
      name: 'RobotTypeService',
      path: '../services/robotTypeService',
    },
    floor: {
      name: 'FloorService',
      path: '../services/floorService',
    },
    floorMap: {
      name: 'FloorMapService',
      path: '../services/floorMapService',
    },
    elevator: {
      name: 'ElevatorService',
      path: '../services/elevatorService',
    },
    task: {
      name: 'TaskService',
      path: '../services/taskService',
    },
  },
};
