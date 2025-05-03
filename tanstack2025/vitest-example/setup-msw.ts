import { HttpResponse, http } from "msw";
import { setupWorker } from "msw/browser";

import { afterEach } from "vitest";
import { newCard } from "./test-data.ts";
import { CardDto } from "@/types.ts";

const worker = setupWorker();

export const setupApiMock = async () => {
  worker.use(
    http.post("http://localhost:7100/api/cards", async ({ request }) => {
      return HttpResponse.json(newCard);
    }),
  );
  await worker.start();
};

// establish API mocking before all tests
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => worker.resetHandlers());
