import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import App from "../App";

test("App can translate", async () => {
  const user = userEvent.setup();
  const app = render(<App />);

  const textAreaFrom = app.getByPlaceholderText("Enter text");

  await user.type(textAreaFrom, "Hola mundo");

  const result = await app.findByDisplayValue(
    /Hello world/i,
    {},
    { timeout: 5000 }
  );

  expect(result).toBeTruthy();
});
