import { Request, Response } from 'express';

export const getFile = (req: Request, res: Response) => {
  console.log(req.user);
  res.send({ message: 'Hello from protected route' });
};
