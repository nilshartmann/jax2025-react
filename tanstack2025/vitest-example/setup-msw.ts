import { HttpResponse, http } from "msw";
import { setupWorker } from "msw/browser";

import { afterEach } from "vitest";
import { CardDto } from "@/types.ts";

export const worker = setupWorker();

// establish API mocking before all tests
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => worker.resetHandlers());
