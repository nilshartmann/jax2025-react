import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanstackRouter } from "@tanstack/react-router";

import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { routeTree } from "./routeTree.gen";
import { enableSsr } from "@/demo-config.ts";

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
      },
    },
  });
};

const createSpaRouter = (queryClient: QueryClient = createQueryClient()) => {
  const router = createTanstackRouter({
    routeTree,
    context: {
      queryClient,
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

const createSsrRouter = (queryClient: QueryClient = createQueryClient()) => {
  const router = createTanstackRouter({
    routeTree,
    context: {
      queryClient,
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return routerWithQueryClient(router, queryClient);
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

// Create a new router instance
export const createRouter = enableSsr ? createSsrRouter : createSpaRouter;
