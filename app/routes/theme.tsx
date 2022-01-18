import type { PrismaClient } from "@prisma/client";

export default function Example() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const d = 1;

  console.log(JSON.stringify(days, null, 2));

  return (
    <fieldset className="grid grid-cols-7 border-b divide-y divide-x">
      <legend className="sr-only">Notifications</legend>
      {days.map((day, index) => (
        <div key={day} className="flex flex-col items-center">
          <p className="font-mono font-extrabold">{day}</p>
        </div>
      ))}
      {days.map((day, index) => (
        <div key={day} className="flex flex-col items-center p-1">
          <input
            className="w-12 h-12 text-gray-900 checked:bg-none rounded-full border-gray-300 focus:ring-gray-500"
            disabled={d > index + 1}
            id="comments"
            name="comments"
            type="checkbox"
          />
          <label className="sr-only" htmlFor="comments">
            Comments
          </label>
        </div>
      ))}
    </fieldset>
  );
}
