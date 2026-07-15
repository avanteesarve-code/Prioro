export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-4xl">
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
          About Prioro
        </span>

        <h1 className="mt-6 text-5xl font-bold tracking-tight">
          AI-Powered Customer Support Automation
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
          Prioro helps organizations streamline customer support
          operations using Artificial Intelligence. From ticket
          classification and prioritization to response generation
          and analytics, Prioro reduces manual effort and improves
          support efficiency.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">
          What is Prioro?
        </h2>

        <p className="mt-4 max-w-4xl text-gray-600 dark:text-gray-400">
          Prioro is an AI-powered support ticket management platform
          designed to automate repetitive support workflows. It
          intelligently classifies incoming tickets, assigns
          priorities, suggests responses using a knowledge base,
          and provides actionable analytics for support teams.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">
          Why Use Prioro?
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <FeatureCard
            title="Faster Response Times"
            description="Reduce delays by automatically classifying and prioritizing tickets."
          />

          <FeatureCard
            title="Improved Productivity"
            description="Allow agents to focus on solving problems instead of managing workflows."
          />

          <FeatureCard
            title="AI-Powered Suggestions"
            description="Generate contextual replies using retrieved knowledge base information."
          />

          <FeatureCard
            title="Actionable Analytics"
            description="Monitor workloads, ticket trends, and support performance."
          />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">
          Who Can Use Prioro?
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="Startups"
            description="Scale customer support without increasing headcount."
          />

          <FeatureCard
            title="SaaS Companies"
            description="Handle customer issues efficiently with AI assistance."
          />

          <FeatureCard
            title="Enterprise Teams"
            description="Improve support operations and response consistency."
          />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">
          Technology Stack
        </h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Node.js',
            'Express.js',
            'PostgreSQL',
            'Prisma',
            'Google Gemini AI',
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border px-4 py-2 text-sm"
            >
              {tech}
            </span>
          ))}
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
    <div className="rounded-2xl border p-6 transition-all hover:shadow-lg">
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}