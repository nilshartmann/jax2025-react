import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Hello from "./Hello.tsx";

test("Hello World", async () => {
  render(<Hello />);

  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
