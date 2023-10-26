import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { IRobotDTO } from "../../dto/IRobotDTO";
import { RobotNickname } from "./robotNickname";
import { RobotDesignacao } from "./robotDesignacao";
import { RobotEstado } from "./robotEstado";
import {RobotNumeroSerie} from "./robotNumeroSerie";

interface RobotProps {
  nickname: RobotNickname;
  designacao: RobotDesignacao;
  estado: RobotEstado;
  numeroSerie: RobotNumeroSerie;
}

export class Robot extends AggregateRoot<RobotProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get nickname (): string {
    return this.props.nickname.value;
  }
  set nickname ( value: string) {
    this.props.nickname = RobotNickname.create(value).getValue();
  }

  get designacao (): string {
    return this.props.designacao.value;
  }
  set designacao ( value: string) {
    this.props.designacao = RobotDesignacao.create(value).getValue();
  }

  get estado (): boolean {
    return this.props.estado.value;
  }
  set estado ( value: boolean) {
    this.props.estado = RobotEstado.create(value).getValue();
  }

  get numeroSerie (): number {
    return this.props.numeroSerie.value;
  }
  set numeroSerie ( value: number) {
    this.props.numeroSerie = RobotNumeroSerie.create(value).getValue();
  }


  private constructor (props: RobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (robotDTO: IRobotDTO | any, id?: UniqueEntityID): Result<Robot> {

    const nicknameX = RobotNickname.create(robotDTO.nickname);
    const designacaoX = RobotDesignacao.create(robotDTO.designacao);
    const estadoX = RobotEstado.create(robotDTO.estado);
    const numeroSerieX = RobotNumeroSerie.create(robotDTO.numeroSerie);


    const robot = new Robot({
      nickname: nicknameX.getValue(),
      designacao: designacaoX.getValue(),
      estado: estadoX.getValue(),
      numeroSerie: numeroSerieX.getValue()
    }, id);

    return Result.ok<Robot>(robot);
  }

}
