import { Router } from 'express';

import { healthRouter } from './health.routes.js';
import { ticketRouter } from './ticket.routes.js';
import { dashboardRouter } from './dashboard.routes.js';

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use('/tickets', ticketRouter);
apiRouter.use('/dashboard', dashboardRouter);