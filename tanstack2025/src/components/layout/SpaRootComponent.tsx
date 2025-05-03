import { HeadContent, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NavBar from "@/components/NavBar.tsx";

export default function SpaRootComponent() {
  return (
    <>
      <HeadContent />
      <>
        <header>
          <NavBar />
        </header>
        <Outlet />
        {/*
           DEMO
           - NICHT VERLANGSAMEN!!!!

           - Navigation => Query Cache füllt sich
           -            => keine Requests mehr

           */}
        <ReactQueryDevtools />
      </>
    </>
  );
}