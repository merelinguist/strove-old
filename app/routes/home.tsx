import type { LinksFunction } from "remix";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Raleway:wght@900",
    },
  ];
};

export default function HomeRoute() {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="prose prose-lg mx-auto py-10 px-4 sm:px-6 lg:prose-2xl lg:px-8">
        <h1 className="font-['Raleway']">Strove…</h1>
        <p className="lead">
          is an ultra-minimal but ultra-smart learning app.
        </p>
        <form
                data-splitbee-event="Subscribe to Early Access"

          action="https://formspree.io/f/mbjwozyq"
          method="POST"
          className="sm:flex sm:w-full sm:max-w-lg"
        >
          <div className="min-w-0 flex-1">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="block w-full rounded-md border border-gray-300 px-5 py-3 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-3">
            <button
              type="submit"
              className="block w-full rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-10"
            >
              Notify me
            </button>
          </div>
        </form>
        <p>More precisely, Strove has:</p>
        <ul>
          <li> Easy flashcard creation and imports from other apps</li>
          <li>Daily quizzes and streaks</li>
          <li> AI and research-based spaced repetition</li>
        </ul>
      </div>
    </div>
  );
}
