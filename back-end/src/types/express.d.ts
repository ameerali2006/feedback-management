import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

declare module "express" {
  export interface Request {
    user?:JwtPayload & {
      id: string;
      email: string;
    };
  }
}