import { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';
import { AnyZodObject, ZodError } from 'zod';

export function validateData(schema: AnyZodObject) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors
          .map((issue) => issue.message)
          .join(', ');
        return next(createHttpError(401, errorMessages));
      } else {
        return next(error);
      }
    }
  };
}
