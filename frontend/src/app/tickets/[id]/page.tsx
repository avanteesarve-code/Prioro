"use client";

import { use, useEffect, useState } from 'react';

import { StatusSelector } from '@/components/tickets/status-selector';
import { useTicket } from '@/hooks/use-ticket';
import {
  updateTicketStatus,
  getSuggestedReply,
} from '@/services/ticket.service';
import { StatusBadge } from '@/components/tickets/status-badge';
import { PriorityBadge } from '@/components/tickets/priority-badge';
import { AIInsightsCard } from '@/components/tickets/ai-insights-card';
import { AssignedAgentCard } from '@/components/tickets/assigned-agent-card';
import { ActivityTimeline } from '@/components/tickets/activity-timeline';

interface TicketDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function TicketDetailsPage({
  params,
}: TicketDetailsPageProps) {
  const { id } = use(params);

  return (
    <TicketDetailsContent
      id={id}
    />
  );
}

function TicketDetailsContent({
  id,
}: {
  id: string;
}) {
  const { ticket, loading } = useTicket(id);

  const [status, setStatus] =
    useState('');

    const [replyLoading, setReplyLoading] =
  useState(false);

const [suggestedReply, setSuggestedReply] =
  useState('');

const [replyHistory, setReplyHistory] =
  useState<string[]>([]);

const [knowledgeSources, setKnowledgeSources] =
  useState<string[]>([]);

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
    }
  }, [ticket]);

  async function handleStatusChange(
    newStatus: string,
  ) {
    try {
      setStatus(newStatus);

      await updateTicketStatus(
        ticket!.id,
        newStatus,
      );
    } catch (error) {
      console.error(
        'Failed to update status:',
        error,
      );

      alert(
        'Failed to update ticket status',
      );
    }
  }

async function handleCopyReply() {
  try {
    await navigator.clipboard.writeText(
      suggestedReply,
    );

    alert('Reply copied');
  } catch (error) {
    console.error(error);
    alert('Failed to copy reply');
  }
}

  async function handleGenerateReply() {
  try {
    setReplyLoading(true);

    const result =
      await getSuggestedReply(id);

    setSuggestedReply(
      result.suggestedReply,
    );

    setReplyHistory([
  result.suggestedReply,
]);

    setKnowledgeSources(
      result.knowledgeSources,
    );
  } catch (error) {
    console.error(error);

    alert(
      'Failed to generate reply',
    );
  } finally {
    setReplyLoading(false);
  }
}

async function handleRegenerateReply() {
  try {
    setReplyLoading(true);

    const result =
      await getSuggestedReply(id);

    setSuggestedReply(
      result.suggestedReply,
    );

setReplyHistory((prev) => [
  ...prev,
  result.suggestedReply,
]);

    setKnowledgeSources(
      result.knowledgeSources,
    );
  } catch (error) {
    console.error(error);

    alert(
      'Failed to regenerate reply',
    );
  } finally {
    setReplyLoading(false);
  }
}

  if (loading) {
    return (
      <main className="container mx-auto bg-white p-6 text-gray-900 dark:bg-black dark:text-white">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Loading Ticket...
        </h1>
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="container mx-auto bg-white p-6 text-gray-900 dark:bg-black dark:text-white">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Ticket Not Found
        </h1>
      </main>
    );
  }

  return (
  <main className="container mx-auto bg-white p-6 text-gray-900 dark:bg-black dark:text-white">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
      Ticket Details
    </h1>

    <div className="mt-6 grid gap-6 lg:grid-cols-3">
      {/* Left Column */}
      <div className="lg:col-span-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
            Ticket Information
          </h2>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                Subject
              </p>

              <p className="font-medium text-gray-900 dark:text-white">
                {ticket.subject}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                Description
              </p>

              <p className="text-gray-900 dark:text-white">
                {ticket.body}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <strong>Status:</strong>

              <StatusSelector
                value={status}
                onChange={handleStatusChange}
              />

              <StatusBadge status={status} />
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                Category
              </p>

              <p className="font-medium text-gray-900 dark:text-white">
                {ticket.category?.name ?? 'N/A'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <strong>Priority:</strong>

              <PriorityBadge
                priority={
                  ticket.priority?.label ?? 'LOW'
                }
              />
            </div>

            <div>
              <button
                onClick={handleGenerateReply}
                disabled={replyLoading}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {replyLoading
                  ? 'Generating...'
                  : 'Generate Suggested Reply'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <AssignedAgentCard
          agent={ticket.assignedAgent}
        />

        <AIInsightsCard
          category={ticket.category?.name}
          priority={ticket.priority?.label}
          categoryConfidence={
            ticket.aiConfidenceCategory
          }
          priorityConfidence={
            ticket.aiConfidencePriority
          }
          reasoning={
            ticket.aiResponses?.[0]
              ?.generatedText
          }
        />
      </div>
    </div>

    {suggestedReply && (
      <section className="mt-8">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI Suggested Reply
            </h2>

            <div className="flex gap-2">
              <button
                onClick={handleRegenerateReply}
                disabled={replyLoading}
                className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-zinc-800"
              >
                {replyLoading
                  ? 'Generating...'
                  : 'Regenerate'}
              </button>

              <button
                onClick={handleCopyReply}
                className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Copy Reply
              </button>
            </div>
          </div>

          <div className="rounded-md bg-gray-50 p-4 dark:bg-zinc-900">
            <p className="whitespace-pre-wrap text-gray-900 dark:text-white">
              {suggestedReply}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
  Knowledge Sources
</h3>

<div className="flex flex-wrap gap-2">
  {knowledgeSources.map((source) => (
    <span
      key={source}
      className="rounded-full border border-gray-300 px-3 py-1 text-sm dark:border-zinc-700"
    >
      {source}
    </span>
  ))}
</div>

{replyHistory.length > 1 && (
  <div className="mt-6">
    <h3 className="mb-3 font-medium text-gray-900 dark:text-white">
      Reply History
    </h3>

    <div className="space-y-3">
      {replyHistory.map((reply, index) => (
        <div
          key={index}
          className="rounded-md border p-3 text-sm"
        >
          <div className="mb-2 font-medium">
            Version {index + 1}
          </div>

          <p className="whitespace-pre-wrap">
            {reply}
          </p>
        </div>
      ))}
    </div>
  </div>
)}

            <div className="flex flex-wrap gap-2">
              {knowledgeSources.map((source) => (
                <span
                  key={source}
                  className="rounded-full border border-gray-300 px-3 py-1 text-sm dark:border-zinc-700"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    )}

    <section className="mt-8">
      <ActivityTimeline
        activities={ticket.activities}
      />
    </section>
  </main>
);}