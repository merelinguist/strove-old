import { MailIcon } from "@heroicons/react/solid";
import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { Link } from "remix";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

function Demo({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-start space-y-4 sm:flex-row sm:items-end sm:justify-around sm:space-y-0">
        {children}
      </div>
    </div>
  );
}

const sizes = [
  "extraSmall",
  "small",
  undefined,
  "large",
  "extraLarge",
] as const;

export default function ComponentsPage() {
  return (
    <div className="mx-auto h-full max-w-7xl space-y-8 bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Components</h1>

      <Demo>
        {sizes.map((size) => (
          <Button size={size}>Button text</Button>
        ))}
      </Demo>

      <Demo>
        {sizes.map((size) => (
          <Button intent="white" size={size}>
            Button text
          </Button>
        ))}
      </Demo>

      <Demo>
        {sizes.map((size) => (
          <Button intent="danger" size={size}>
            Button text
          </Button>
        ))}
      </Demo>

      <Demo>
        <Button intent="danger" shape="stretch" size="extraLarge">
          Button text
        </Button>
      </Demo>

      <Demo>
        <div className="w-full">
          <Input>
            <Input.Label>Email</Input.Label>
            <Input.Field type="text" />
          </Input>
        </div>
      </Demo>
    </div>
  );
}
