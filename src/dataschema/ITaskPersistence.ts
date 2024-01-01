export interface ITaskPersistence {
  taskId?: string;
  user: string;
  taskType: string;
  taskStatus: string;

  pickupRoomId: string;
  deliveryRoomId: string;
  deliveryConfirmationCode: number;
  description: string;

  buildingId: string;
  floorId: string;
  emergencyContact: string;
}
