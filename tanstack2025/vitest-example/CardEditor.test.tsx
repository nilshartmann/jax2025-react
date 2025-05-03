import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { HttpResponse, http } from "msw";
import { worker } from "./setup-msw.ts";
import { newCard } from "./test-data.ts";
import CardEditor from "@/components/CardEditor.tsx";
import { createQueryClient } from "@/router.tsx";

import "../src/globals.css";

test("creates and saves new card", async () => {
  const screen = render(
    <QueryClientProvider client={createQueryClient()}>
      <CardEditor />
    </QueryClientProvider>,
  );
});
