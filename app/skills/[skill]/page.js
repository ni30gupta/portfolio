import SupportiveComponent from "@/components/SupportiveComponent";
import Link from "next/link";
import PushNotificationsDemo from "@/components/PushNotificationsDemo";

const skillData = {
  redux: {
    title: "Redux",
    description:
      "Redux provides a predictable state container for JavaScript apps. Use it for global state, middlewares, and time-travel debugging.",
    details: [
      "Core concepts: store, reducers, actions",
      "Good for large apps with complex state",
      "Works well with React via react-redux hooks"
    ],
  },
  "context-api": {
    title: "Context API",
    description:
      "React Context makes it easy to pass data through the component tree without prop drilling.",
    details: [
      "Lightweight for theme/auth/localization",
      "Prefer for low-frequency updates",
      "Pair with useReducer for predictable state"
    ],
  },
  "shared-worker": {
    title: "Shared Worker",
    description:
      "Shared Workers run in the background and can be shared across multiple browser contexts (tabs/windows) of the same origin.",
    details: [
      "Useful for coordinating state across tabs",
      "Uses postMessage for communication",
      "Consider security and lifecycle differences vs Service Worker"
    ],
  },
  "service-worker": {
    title: "Service Worker",
    description:
      "Service Workers power offline experiences, caching strategies and background sync for PWAs.",
    details: [
      "Intercept network requests for caching",
      "Use Workbox for common patterns",
      "Test lifecycle: install -> activate -> fetch"
    ],
  },
  "custom-hook": {
    title: "Custom Hook",
    description:
      "Custom React hooks let you extract reusable stateful logic (like localStorage syncing, fetch wrappers, or timers) into composable functions.",
    details: [
      "Create small, focused hooks for reuse across components",
      "Keep hooks pure from side-effects when possible (useEffect for effects)",
      "Example: useLocalStorage to persist state to localStorage",
    ],
  },
};

export default async function SkillPage({ params }) {
  // Next.js 16+: params is now a Promise and must be awaited
  const { skill } = await params;
  const data = skillData[skill];

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
        <main className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Skill not found</h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">No information is available for "{skill}".</p>
          <div className="mt-6">
            <Link href="/" className="text-indigo-600 hover:underline dark:text-indigo-400">
              Back to skills
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-6 dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{data.title}</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">{data.description}</p>
          </div>
          <div>
            <Link href="/" className="text-sm text-zinc-700 hover:underline dark:text-zinc-300">
              ← Back
            </Link>
          </div>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Highlights</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
            {data.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">This page is a starting point — we can add demos, code snippets and live sandboxes for <strong>{data.title}</strong>.</p>
          </div>
        </section>
        {/* If this is the Service Worker skill, show the push notifications demo here */}
        {skill === "service-worker" && (
          <section className="mt-6">
            <PushNotificationsDemo />
          </section>
        )}

        <SupportiveComponent skill={skill} />
      </main>
    </div>
  );
}
