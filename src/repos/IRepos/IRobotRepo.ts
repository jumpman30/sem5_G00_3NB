import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot/robot";
export default interface ITruckRepo extends Repo<Robot> {
  save(user: Robot): Promise<Robot>;
  findByNickname (nickname: string): Promise<Robot>;
  getAll(): Promise<Robot[]>;
}
