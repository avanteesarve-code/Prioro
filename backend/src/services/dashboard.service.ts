import { prisma } from '../config/prisma.js';

export interface DashboardOverview {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  urgentTickets: number;
  totalAgents: number;
  averageTicketsPerAgent: number;
}

export interface AgentWorkload {
  agentId: string;
  agentName: string;
  openTickets: number;
  inProgressTickets: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const [
    totalTickets,
    openTickets,
    resolvedTickets,
    urgentTickets,
    totalAgents,
  ] = await Promise.all([
    prisma.ticket.count(),
    prisma.ticket.count({
      where: {
        status: 'OPEN',
      },
    }),
    prisma.ticket.count({
      where: {
        status: 'RESOLVED',
      },
    }),
    prisma.ticket.count({
      where: {
        priority: {
          label: 'URGENT',
        },
      },
    }),
    prisma.user.count({
      where: {
        role: 'AGENT',
      },
    }),
  ]);

  const averageTicketsPerAgent =
    totalAgents === 0
      ? 0
      : Number((totalTickets / totalAgents).toFixed(1));

  return {
    totalTickets,
    openTickets,
    resolvedTickets,
    urgentTickets,
    totalAgents,
    averageTicketsPerAgent,
  };
}

export async function getAgentWorkloads(): Promise<AgentWorkload[]> {
  const agents = await prisma.user.findMany({
    where: {
      role: 'AGENT',
    },
    include: {
      assignedTickets: {
        select: {
          status: true,
        },
      },
    },
  });

  return agents.map((agent) => ({
    agentId: agent.id,
    agentName: agent.name,
    openTickets: agent.assignedTickets.filter(
      (ticket) => ticket.status === 'OPEN',
    ).length,
    inProgressTickets: agent.assignedTickets.filter(
      (ticket) => ticket.status === 'IN_PROGRESS',
    ).length,
  }));
}

export async function getCategoryDistribution(): Promise<CategoryDistribution[]> {
  const categories = await prisma.category.findMany({
    include: {
      tickets: {
        select: {
          id: true,
        },
      },
    },
  });

  return categories.map((category) => ({
    category: category.name,
    count: category.tickets.length,
  }));
}