import { useSuspenseQuery } from "@tanstack/react-query";
import {
  startTransition,
  Suspense,
  unstable_ViewTransition as ViewTransition,
  useState,
} from "react";

type TabName = "about" | "info" | "data";

export default function ViewTransitionDemo() {
  const [activeTab, setActiveTab] = useState<TabName | null>(null);

  const handleTabChange = (newTab: TabName) => {
    startTransition(() => {
      setActiveTab(newTab === activeTab ? null : newTab);
    });
  };

  const btnClassName = (tab: string) =>
    activeTab === tab ? "active" : undefined;

  return (
    <div className={"flex flex-col gap-y-4"}>
      <div className={"flex space-x-4 border-gray-300 p-2"}>
        <button
          className={btnClassName("about")}
          onClick={() => handleTabChange("about")}
        >
          About
        </button>
        <button
          className={btnClassName("info")}
          onClick={() => handleTabChange("info")}
        >
          Info
        </button>
        <button
          className={btnClassName("data")}
          onClick={() => handleTabChange("data")}
        >
          Data
        </button>
      </div>

      {activeTab === "info" && (
        <ViewTransition>
          <Announcement />
        </ViewTransition>
      )}
      {activeTab === "about" && (
        <ViewTransition>
          <About />
        </ViewTransition>
      )}
      {activeTab === "data" && (
        <Suspense
          fallback={
            <ViewTransition>
              <Loading />
            </ViewTransition>
          }
        >
          <ViewTransition>
            <DataComponent />
          </ViewTransition>
        </Suspense>
      )}
    </div>
  );
}

function About() {
  return (
    <div className={"border-4 border-teal-600 bg-teal-200 p-8"}>
      <h1>About us</h1>
      <p>Great services</p>
    </div>
  );
}

function Announcement() {
  return (
    <div className={"border-4 border-amber-600 bg-amber-200 p-8"}>
      <h1>Important Announcement</h1>
      <p>React now supports View Transitions</p>
    </div>
  );
}

function Loading() {
  return (
    <div className={"border-4 border-fuchsia-600 bg-fuchsia-200 p-8"}>
      <h1>Loading Data...</h1>
      <p>Please hold the line!</p>
    </div>
  );
}

function DataComponent() {
  useDemoSuspenseQuery(["data"], 1200);

  return (
    <div className={"border-4 border-blue-600 bg-blue-200 p-8"}>
      <h1>Data loaded with suspense!</h1>
      <p>This data could have been loaded from the backend...</p>
    </div>
  );
}

function useDemoSuspenseQuery(keys: Array<string | number>, duration = 5000) {
  return useSuspenseQuery({
    queryKey: [keys],
    staleTime: 0,
    gcTime: 4000,
    refetchOnMount: true,
    queryFn() {
      console.log("Simulating Suspense Query with keys  ", keys);
      return new Promise((res) => {
        setTimeout(() => res("huhu"), duration);
      });
    },
  });
}
