export function Header({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-lg text-gray-700">{description}</p>
      )}
    </header>
  );
}
