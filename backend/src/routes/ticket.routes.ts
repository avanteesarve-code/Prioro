import { Router } from 'express';

import {
  createTicketController,
  getSuggestedReplyController,
  getTicketByIdController,
  getTicketStatsController,
  getTicketsByAgentController,
  getTicketsController,
  updateTicketStatusController,
} from '../controllers/ticket.controller.js';

export const ticketRouter = Router();

ticketRouter.get('/stats', getTicketStatsController);
ticketRouter.post('/', createTicketController);
ticketRouter.get('/', getTicketsController);
ticketRouter.get('/agent/:agentId', getTicketsByAgentController);
ticketRouter.get('/:id', getTicketByIdController);
ticketRouter.patch('/:id/status', updateTicketStatusController);
ticketRouter.get('/:id/suggested-reply', getSuggestedReplyController);