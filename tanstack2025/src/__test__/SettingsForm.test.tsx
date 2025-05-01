import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, test, vi } from "vitest";

import SettingsForm from "../components/SettingsForm.tsx";
import { createQueryClient } from "../create-query-client.ts";

const handlers = [
  http.put("http://localhost:7100/api/users/1", async ({ request }) => {
    const requestBody = await request.json();
    console.log("REQUEST BODY", requestBody);
    return HttpResponse.json({});
  }),
];

const server = setupServer(...handlers);
// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

test("works!", async () => {
  const user = userEvent.setup();
  const saveCallback = vi.fn();

  render(
    <QueryClientProvider client={createQueryClient()}>
      <SettingsForm onSaved={saveCallback} />)
    </QueryClientProvider>,
  );

  await user.type(screen.getByLabelText(/Your name/i), "Kla");
  expect(screen.getByText(/Please enter a na/i)).toBeInTheDocument();

  await user.type(screen.getByLabelText(/Your name/i), "Klaus");
  expect(screen.queryByText(/Please enter a na/i)).not.toBeInTheDocument();

  await user.type(screen.getByLabelText(/Your name/i), "2");

  await user.click(screen.getByRole("button", { name: /save/i }));

  expect(saveCallback).toHaveBeenCalled();
});
