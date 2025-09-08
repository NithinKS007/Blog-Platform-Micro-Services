import { Request } from "express";
export interface customReq extends Request {
  user?: {
    id: string;
    role: string;
  };
}
