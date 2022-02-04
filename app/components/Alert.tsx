import { XCircleIcon } from "@heroicons/react/solid";

import { inlineMarkdown } from "~/utils/markdown";

export const id = "alert";

export const Alert = ({ errors }: { errors?: string[] }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  const verb = errors.length === 1 ? "was" : "were";
  const noun = errors.length === 1 ? "error" : "errors";

  return (
    <div className="p-4 bg-red-50 rounded-md">
      <div className="flex">
        <div className="shrink-0">
          <XCircleIcon aria-hidden className="w-5 h-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            There {verb} {errors.length} {noun} with your submission
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="pl-5 space-y-1 list-disc">
              <style>
                {`
                  li strong {
                    font-weight: 600;
                  }
                `}
              </style>
              {errors.map((error) => (
                <li
                  dangerouslySetInnerHTML={{ __html: inlineMarkdown(error) }}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
