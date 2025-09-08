import { Request, Response } from "express";
import { IBaseController } from "../interfaces/interfaces";

export class SignUpController implements IBaseController{
    handle(request: Request, response: Response): Promise<void> {
        
    }
}