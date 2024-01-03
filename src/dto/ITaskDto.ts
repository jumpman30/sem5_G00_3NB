interface TaskDto {
  taskId?: string;
  user: string;
  taskType: string;
  taskStatus: string;
  createdAt?: Date;
  updatedAt?: Date;

  pickupRoomId: string;
  deliveryRoomId: string;
  deliveryConfirmationCode: number;
  description: string;

  buildingId: string;
  floorId: string;
  emergencyContact: string;
}

export type responseTaskDto = Omit<
  TaskDto,
  | 'pickupRoomId'
  | 'deliveryRoomId'
  | 'deliveryConfirmationCode'
  | 'description'
  | 'buildingId'
  | 'floorId'
  | 'emergencyContact'
  | 'updatedAt'
  | 'createdAt'
> &
  Partial<
    Pick<
      TaskDto,
      | 'pickupRoomId'
      | 'deliveryRoomId'
      | 'deliveryConfirmationCode'
      | 'description'
      | 'buildingId'
      | 'floorId'
      | 'emergencyContact'
      | 'updatedAt'
      | 'createdAt'
    >
  >;

export type requestSurveillanceTaskDto = Omit<
  TaskDto,
  | 'pickupRoomId'
  | 'deliveryRoomId'
  | 'deliveryConfirmationCode'
  | 'description'
  | 'updatedAt'
  | 'createdAt'
>;

export type requestPickupDeliveryTaskDto = Omit<
  TaskDto,
  'buildingId' | 'floorId' | 'emergencyContact' | 'updatedAt' | 'createdAt'
>;
