import { createElement } from "react";

const cons: Console = console;

const button = createElement(
  "button",
  { onClick: () => console.log("click"), type: "button" },
  "Click me",
);
