import { inject, injectable } from "inversify";
import {
  IAuthService,
  IJwtService,
  IMessageService,
} from "../interfaces/interfaces";
import { TYPES } from "../di/types";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.JwtService) private readonly jwtService: IJwtService,
    @inject(TYPES.MessageService) private readonly messageService: IMessageService
  ) {}

  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<string> {
    const { name, email, password } = data;
    if (!name || !email || !password) throw new Error("Missing required fields.");

    await this.messageService.publishMessage({
      topic: "user.create",
      message: { name, email, password },
    });
  }
}
