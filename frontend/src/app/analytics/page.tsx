'use client';

import { useEffect, useState } from 'react';

import {
  getDashboardOverview,
  getCategoryDistribution,
  getAgentWorkloads,
} from '@/services/dashboard.service';

import type {
  CategoryDistribution,
  AgentWorkload,
} from '@/types/dashboard';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import {
  CartesianGrid,
} from 'recharts';

interface DashboardOverview {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  urgentTickets: number;
  totalAgents: number;
  averageTicketsPerAgent: number;
}

export default function AnalyticsPage() {
  const [data, setData] =
    useState<DashboardOverview | null>(null);

  const [categoryData, setCategoryData] =
    useState<CategoryDistribution[]>([]);

    const [workloadData, setWorkloadData] =
  useState<AgentWorkload[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [
  overview,
  categories,
  workloads,
] = await Promise.all([
  getDashboardOverview(),
  getCategoryDistribution(),
  getAgentWorkloads(),
]);

setData(overview);
setCategoryData(categories);
setWorkloadData(workloads);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl p-8">
        Loading Analytics...
      </main>
    );
  }

  if (!data) {
    return (
      <main className="mx-auto max-w-7xl p-8">
        Failed to load analytics
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-10">
        <div className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
          Prioro Analytics
        </div>

        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          Support Operations Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-gray-500">
          Monitor ticket volume, team performance,
          workload distribution, and support trends.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          title="Total Tickets"
          value={data.totalTickets}
        />

        <MetricCard
          title="Open Tickets"
          value={data.openTickets}
        />

        <MetricCard
          title="Resolved Tickets"
          value={data.resolvedTickets}
        />

        <MetricCard
          title="Urgent Tickets"
          value={data.urgentTickets}
        />

        <MetricCard
          title="Total Agents"
          value={data.totalAgents}
        />

        <MetricCard
          title="Avg Tickets / Agent"
          value={data.averageTicketsPerAgent}
        />
      </div>

            <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="mb-6 text-2xl font-semibold">
          Tickets by Category
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
                <CartesianGrid
  strokeDasharray="3 3"
  stroke="#27272a"
/>
  <XAxis
    dataKey="category"
    stroke="#94a3b8"
  />

  <YAxis
    stroke="#94a3b8"
  />

  <Tooltip
    contentStyle={{
      backgroundColor: '#18181b',
      border: '1px solid #3f3f46',
      color: '#fff',
    }}
  />

  <Bar
    dataKey="count"
    fill="#6366f1"
    radius={[8, 8, 0, 0]}
  />
</BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="mb-6 text-2xl font-semibold">
          Agent Workload
        </h2>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workloadData}>
                <CartesianGrid
  strokeDasharray="3 3"
  stroke="#27272a"
/>
  <XAxis
    dataKey="agentName"
    stroke="#94a3b8"
  />

  <YAxis
    stroke="#94a3b8"
  />

  <Tooltip
    contentStyle={{
      backgroundColor: '#18181b',
      border: '1px solid #3f3f46',
      color: '#fff',
    }}
  />

  <Legend />

  <Bar
    dataKey="openTickets"
    name="Open Tickets"
    fill="#6366f1"
    radius={[8, 8, 0, 0]}
  />

  <Bar
    dataKey="inProgressTickets"
    name="In Progress"
    fill="#22c55e"
    radius={[8, 8, 0, 0]}
  />
</BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <h2 className="mt-4 text-4xl font-bold tracking-tight">
        {value}
      </h2>
    </div>
  );
}