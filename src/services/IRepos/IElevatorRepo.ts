import { Repo } from '../../core/infra/Repo';
import { Elevator } from '../../domain/elevator/elevator';
import { Role } from '../../domain/role';
import { RoleId } from '../../domain/roleId';

export default interface IElevatorRepo extends Repo<Elevator> {
  save(elevator: Elevator): Promise<Elevator>;
  countByBuilding(buildingId: string): Promise<number>
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}
