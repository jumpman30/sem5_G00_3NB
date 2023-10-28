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

  controllers: {
    role: {
      name: 'RoleController',
      path: '../controllers/roleController',
    },
    floor: {
      name: 'FloorController',
      path: '../controllers/floorController',
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
  },

  repos: {
    role: {
      name: 'RoleRepo',
      path: '../repos/roleRepo',
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

  },

  services: {
    role: {
      name: 'RoleService',
      path: '../services/roleService',
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
  },
};
