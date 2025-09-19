import { Request, Response } from "express";
import { IAuthService, IBaseController } from "../interfaces/interfaces";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { sendResponse } from "@blog-platform-micro-services/common/index";

@injectable()
export class SignUpController implements IBaseController {
  constructor(
    @inject(TYPES.AuthService) private readonly authService: IAuthService
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const data = req.body;
    console.log("req", data);
    const result = await this.authService.signUp(data);
    sendResponse(res, 201, result, "User created successfully");
  }
}
