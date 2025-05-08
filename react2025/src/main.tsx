import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";

import ActivityDemo from "./ActivityDemo.tsx";
import { createQueryClient } from "./create-query-client.ts";
import ViewTransitionDemo from "./ViewTransitionsDemo.tsx";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Cannot find the root element");
}

const queryClient = createQueryClient();

let demo = "fasdfasd";
const App = demo === "activity" ? <ActivityDemo /> : <ViewTransitionDemo />;

createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <div className={"container mx-auto"}>{App}</div>
    {/*<ReactQueryDevtools />*/}
  </QueryClientProvider>,
);
