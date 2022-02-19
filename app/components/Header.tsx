import { Fragment, ReactNode } from "react";

export function Header({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode[];
}) {
  return (
    <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-lg text-gray-700">{description}</p>
          )}
        </div>
        {actions && (
          <div className="mt-5 flex space-x-3 lg:mt-0 lg:ml-4">
            {actions.map((action, index) => (
              <Fragment key={index}>{action}</Fragment>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
