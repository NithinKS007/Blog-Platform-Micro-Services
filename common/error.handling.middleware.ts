import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../packages/common/http.response";
import { StatusCodes } from "../packages/common//http.status.codes";

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class validationError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.BadRequest);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.NotFound);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.Unauthorized);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.InternalServerError);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.Forbidden);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.Conflict);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.InternalServerError);
  }
}

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || StatusCodes.InternalServerError;
  const message = err.message || "INTERNAL SERVER ERROR";
  sendResponse(res, statusCode, null, message);
};
