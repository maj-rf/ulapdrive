import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import { rateLimit } from 'express-rate-limit';

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
        message: `Please remove related data first. i.e files and share link`,
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
    const { status: prismaStatus, message: prismaMessage } =
      handlePrismaError(error);
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

export const limiter = rateLimit({
  message: { error: 'Too many requests, please try again later.' },
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 25, // Limit each IP to 25 requests per `window` (here, per minute).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
