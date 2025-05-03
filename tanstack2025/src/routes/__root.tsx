import { createRootRouteWithContext, redirect } from "@tanstack/react-router";
import "../globals.css";
import globalsCss from "../globals.css?url";
import type { QueryClient } from "@tanstack/react-query";
import SpaRootComponent from "@/components/layout/SpaRootComponent.tsx";
import { enableSsr } from "@/demo-config.ts";
import SsrRootComponent from "@/components/layout/SsrRootComponent.tsx";

interface MyRouterContext {
  queryClient: QueryClient;
}

const globalCssLink = enableSsr
  ? [{ href: globalsCss, rel: "stylesheet" }]
  : [];

export const Route = createRootRouteWithContext<MyRouterContext>()({
  loader: ({ location }) => {
    if (location.pathname === "/") {
      throw redirect({ to: "/cards" });
    }
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "GreetingCards TanStack Demo",
      },
    ],
    scripts: [
      {
        src: "/hover-link.js",
      },
    ],
    links: [
      ...globalCssLink,
      { href: "/fonts/google-fonts.css", rel: "stylesheet" },
      { href: "/fonts/google-fonts.css", rel: "stylesheet" },
      { href: "/fontawesome/css/fontawesome.css", rel: "stylesheet" },
      { href: "/fontawesome/css/brands.css", rel: "stylesheet" },
      { href: "/fontawesome/css/regular.css", rel: "stylesheet" },
      { href: "/fontawesome/css/solid.css", rel: "stylesheet" },
    ],
  }),

  component: enableSsr ? SsrRootComponent : SpaRootComponent,
});
