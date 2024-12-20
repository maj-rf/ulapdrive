import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import createHttpError, { isHttpError } from 'http-errors';

const handlePrismaError = (err: PrismaClientKnownRequestError) => {
  switch (err.code) {
    case 'P2002':
      // handling duplicate key errors
      return {
        status: 400,
        message: `Duplicate field value: ${err.meta?.target}`,
      };
    case 'P2014':
      // handling invalid id errors
      return { status: 400, message: `Invalid ID: ${err.meta?.target}` };
    case 'P2003':
      // handling invalid data errors
      return {
        status: 400,
        message: `Invalid input data: ${err.meta?.target}`,
      };
    case 'P2025':
      return {
        status: 400,
        message: `Malformatted params: ${err.meta?.cause}`,
      };
    default:
      // handling all other errors
      return { status: 500, message: `Something went wrong: ${err.message}` };
  }
};

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);
  let errorMessage = 'An unknown error has occurred';
  let status = 500;
  if (error instanceof PrismaClientKnownRequestError) {
    console.log(error.code);
    const { status: prismaStatus, message: prismaMessage } =
      handlePrismaError(error);
    console.log({ prismaStatus, prismaMessage });
    status = prismaStatus;
    errorMessage = prismaMessage;
  }
  if (isHttpError(error)) {
    status = error.status;
    errorMessage = error.message;
  }
  res.status(status).json({ error: errorMessage });
  next();
};

export const unknownEndpoint = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(createHttpError(404, `Not Found - ${req.originalUrl}`));
};

export const isAuthenticated = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) next();
  else throw createHttpError(401, 'Unauthenticated');
};
