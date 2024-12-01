import { NextFunction, Request, RequestHandler, Response } from 'express';

// higher order function alternative for try catch
const createAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

export default createAsync;
