import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { HttpResponse, http } from "msw";
import { worker } from "./setup-msw.ts";
import CardEditor from "@/components/CardEditor.tsx";
import { createQueryClient } from "@/router.tsx";

import "../src/globals.css";
import { CardDto } from "@/types.ts";

const newCard: CardDto = {
  message: "New Card",
  title: "Card Title",
  likes: 0,
  image: "01.png",
  id: "TEST-CARD-ID",
};

test("creates and saves new card", async () => {
  worker.use(
    http.post("http://localhost:7100/cards", async ({ request }) => {
      return HttpResponse.json(newCard);
    }),
  );
  await worker.start();

  const onSaveCallback = vi.fn();

  const screen = render(
    <QueryClientProvider client={createQueryClient()}>
      <CardEditor onAfterSave={onSaveCallback} />
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
  await saveButton.click();

  // FUNKTIONIERT OHNE BACKEND NICHT
  await expect.element(screen.getByText(/New card saved/i)).toBeInTheDocument();

  expect(onSaveCallback).toHaveBeenCalledWith(newCard);
});
