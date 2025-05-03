import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";

import ActivityDemo from "./ActivityDemo.tsx";
import { createQueryClient } from "./create-query-client.ts";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Cannot find the root element");
}

const queryClient = createQueryClient();

const App = <ActivityDemo />;
// const App = <ViewTransitionDemo />;

createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <div className={"container mx-auto"}>{App}</div>
    <ReactQueryDevtools />
  </QueryClientProvider>,
);
