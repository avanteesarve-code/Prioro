import type { NextFunction, Request, Response } from 'express';

import {
  getAgentWorkloads,
  getCategoryDistribution,
  getDashboardOverview,
} from '../services/dashboard.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export async function getDashboardOverviewController(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const overview = await getDashboardOverview();

    return res
      .status(200)
      .json(ApiResponse.success('Dashboard overview fetched successfully', overview));
  } catch (error) {
    return next(error);
  }
}

export async function getAgentWorkloadsController(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const workloads = await getAgentWorkloads();

    return res.status(200).json(
      ApiResponse.success(
        'Agent workloads fetched successfully',
        workloads,
      ),
    );
  } catch (error) {
    return next(error);
  }
}

export async function getCategoryDistributionController(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const distribution = await getCategoryDistribution();

    return res.status(200).json(
      ApiResponse.success(
        'Category distribution fetched successfully',
        distribution,
      ),
    );
  } catch (error) {
    return next(error);
  }
}