import type { NextFunction, Request, Response } from 'express';

export function notFoundHandler(_req: Request, res: Response, next: NextFunction) {
  res.status(404);
  next(new Error('Route not found'));
}