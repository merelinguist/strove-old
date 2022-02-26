import { Form, Link } from "remix";
import { route } from "routes-gen";

import { Button } from "~/components/Button";
import { Header } from "~/components/Header";
import { Input } from "~/components/Input";
import { Main } from "~/components/Main";

export { action } from "~/containers/NewDeck/NewDeck.server";

export default function NewDeckRoute() {
  return (
    <div className="mx-auto max-w-lg space-y-10">
      <Header
        title="Project Settings"
        description="Let’s get started by filling in the information below to create your new project."
      />
      <Main>
        <Form replace method="post" className="space-y-6">
          <Input>
            <Input.Label>Deck Name</Input.Label>
            <Input.Field type="text" name="name" required />
          </Input>

          <div className="flex justify-end space-x-3">
            <Button variant="white" as={Link} to={route("/")}>
              Cancel
            </Button>
            <Button type="submit">Create this project</Button>
          </div>
        </Form>
      </Main>
    </div>
  );
}
