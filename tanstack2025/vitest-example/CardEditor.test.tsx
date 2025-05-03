import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { setupApiMock } from "./setup-msw.ts";
import CardEditor from "@/components/CardEditor.tsx";
import { createQueryClient } from "@/router.tsx";

import "../src/globals.css";

test("creates and saves new card", async () => {
  await setupApiMock();

  const screen = render(
    <QueryClientProvider client={createQueryClient()}>
      <CardEditor />
    </QueryClientProvider>,
  );

  await expect
    .element(screen.getByText(/Create your personal greeeting card/i))
    .toBeInTheDocument();

  const saveButton = screen.getByRole("button", { name: /save/i });

  await expect.element(saveButton).toBeDisabled();

  await screen.getByLabelText(/title/i).fill("Your card");
  await screen.getByLabelText(/message/i).fill("Happy testing");
  await screen.getByAltText(/01/).click();
  await expect.element(saveButton).toBeEnabled();

  // SAVE FUNKTIONIERT (NOCH) NICHT, WEIL API-BACKEND NICHT LÄUFT
  await saveButton.click();
  await expect.element(screen.getByText(/New card saved/i)).toBeInTheDocument();
});
