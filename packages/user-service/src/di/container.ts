import { Container } from "inversify";
import {
  IMessageService,
  IUserService,
  KafkaService,
  TYPES,
  UserService,
} from "./file-imports.index";


const container = new Container();

container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IMessageService>(TYPES.MessageService).to(KafkaService);

export { container };
