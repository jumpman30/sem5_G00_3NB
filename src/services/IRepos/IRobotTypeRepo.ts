import { Repo } from '../../core/infra/Repo';
import { RobotType } from '../../domain/robotType/RobotType';
import { RobotTypeId } from '../../domain/robotType/RobotTypeId';

export default interface IRobtTypeRepo extends Repo<RobotType> {
  save(role: RobotType): Promise<RobotType>;
  findByDomainId(roleId: RobotTypeId | string): Promise<RobotType>;
  findByRobotType(robotType: string): Promise<RobotType>;
  getAll(): Promise<RobotType[]>;
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}
