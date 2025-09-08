import { Container } from "inversify";
import {
  AuthService,
  IAuthService,
  IBaseController,
  IJwtService,
  IMessageService,
  JwtService,
  KafkaService,
  SignUpController,
  TYPES,
} from "./file-imports.index";

const container = new Container();

container.bind<IBaseController>(TYPES.SignUpController).to(SignUpController);
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<IJwtService>(TYPES.JwtService).to(JwtService);
container.bind<IMessageService>(TYPES.MessageService).to(KafkaService);

export { container };
