import type { Request, Response } from 'express';

import { getHealthMessage } from '../services/health.service.js';

export function healthController(_req: Request, res: Response) {
  res.status(200).json(getHealthMessage());
}