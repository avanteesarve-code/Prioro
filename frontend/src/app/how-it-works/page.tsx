export default function HowItWorksPage() {
  const steps = [
    {
      title: 'Ticket Submitted',
      description:
        'Customers submit support requests through the platform.',
    },
    {
      title: 'AI Classification',
      description:
        'AI analyzes the ticket and determines its category.',
    },
    {
      title: 'Priority Detection',
      description:
        'Urgency and impact are evaluated automatically.',
    },
    {
      title: 'Auto Assignment',
      description:
        'Tickets are assigned to the most suitable support agent.',
    },
    {
      title: 'Knowledge Retrieval',
      description:
        'Relevant knowledge base articles are retrieved.',
    },
    {
      title: 'AI Suggested Reply',
      description:
        'Gemini generates a contextual response draft.',
    },
    {
      title: 'Resolution',
      description:
        'Agents review, respond, and resolve the issue.',
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
          How Prioro Works
        </span>

        <h1 className="mt-6 text-5xl font-bold tracking-tight">
          AI-Powered Support Workflow
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Prioro automates the complete support lifecycle,
          from ticket creation to resolution, using AI-driven
          classification, prioritization, retrieval, and
          response generation.
        </p>
      </div>

      <div className="mt-20 space-y-8">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex items-start gap-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
              {index + 1}
            </div>

            <div className="flex-1 rounded-2xl border p-6">
              <h2 className="text-2xl font-semibold">
                {step.title}
              </h2>

              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-20 rounded-3xl border p-8">
        <h2 className="text-3xl font-bold">
          AI Features Used
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <FeatureCard
            title="Ticket Classification"
            description="Automatically categorizes support requests."
          />

          <FeatureCard
            title="Priority Prediction"
            description="Detects urgent issues requiring attention."
          />

          <FeatureCard
            title="Knowledge Base Retrieval"
            description="Retrieves relevant support documentation."
          />

          <FeatureCard
            title="Response Generation"
            description="Creates contextual replies using Gemini AI."
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border p-6">
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}