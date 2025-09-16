import { inject, injectable } from "inversify";
import {
  ConsumerHandler,
  IAuthService,
  IJwtService,
  IMessageService,
} from "../interfaces/interfaces";
import { TYPES } from "../di/types";
import { createId } from "@blog-platform-micro-services/common";

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
  }): Promise<void> {
    const correlationId = createId().randomId;
    const { name, email, password } = data;
    if (!name || !email || !password) {

      throw new Error("Missing required fields.");
      
    }
    await this.messageService.publishMessage({
      topic: "user-reg-event-req",
      message: {
        key: `USER_REGISTERED${correlationId}`,
        value: JSON.stringify({ name, email, password }),
      },
    });
    await this.messageService.consumeMessages({
      topic: "user-reg-event-res",
      handler: this.handleRegEventRes.bind(this),
    });
  }

  private async handleRegEventRes(message: ConsumerHandler): Promise<void> {
    console.log("📩 Received registration response from ✅USER.SERVICE:", message);

    switch (message.status) {
      case "success":
        // Example: save userId to DB or issue JWT
        console.log(`✅ User registered with ID: ${message.data}`);
        break;

      case "failed":
        console.error("❌ User registration failed:", message.error);
        break;

      default:
        console.warn(`⚠️ Unknown status received: ${message.status}`, message);
        break;
    }
  }

  async signIn(data: { email: string; password: string }): Promise<void> {}
}
