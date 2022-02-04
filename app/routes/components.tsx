import { Heading } from "~/components/Heading";

const ComponentsRoute = () => (
  <div className="container p-8 mx-auto">
    <Heading as="h1" size="h1">
      Heading 1
    </Heading>
    <Heading as="h2" size="h2">
      Heading 2
    </Heading>
    <Heading as="h3" size="h3">
      Heading 3
    </Heading>
    <Heading as="h4" size="h4">
      Heading 4
    </Heading>
  </div>
);

export default ComponentsRoute;
