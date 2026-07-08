import { Router } from 'express';

import {
  getAgentWorkloadsController,
  getCategoryDistributionController,
  getDashboardOverviewController,
} from '../controllers/dashboard.controller.js';

export const dashboardRouter = Router();

dashboardRouter.get('/overview', getDashboardOverviewController);
dashboardRouter.get('/workloads', getAgentWorkloadsController);
dashboardRouter.get(
  '/category-distribution',
  getCategoryDistributionController,
);