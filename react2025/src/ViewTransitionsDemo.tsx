import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Suspense,
  unstable_ViewTransition as ViewTransition,
  useState,
} from "react";

const x = ViewTransition; // avoid cleaning from imports

type TabName = "about" | "info" | "data";

export default function ViewTransitionDemo() {
  const [activeTab, setActiveTab] = useState<TabName | null>(null);

  const handleTabChange = (newTab: TabName) => {
    setActiveTab(newTab === activeTab ? null : newTab);
  };

  const btnClassName = (tab: string) =>
    activeTab === tab ? "active" : undefined;

  return (
    <main>
      <div className={"ButtonBar"}>
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

      {activeTab === null && <DemoHint />}

      {activeTab === "info" && <Announcement />}
      {activeTab === "about" && <About />}

      {activeTab === "data" && (
        <Suspense fallback={<Loading />}>
          <DataComponent />
        </Suspense>
      )}
    </main>
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
  useSuspenseQuery({
    queryKey: ["data"],
    staleTime: 0,
    gcTime: 4000,
    refetchOnMount: true,
    queryFn() {
      console.log("Simulating Suspense Query");
      return new Promise((res) => {
        setTimeout(() => res("huhu"), 1200);
      });
    },
  });

  return (
    <div className={"border-4 border-blue-600 bg-blue-200 p-8"}>
      <h1>Data loaded with suspense!</h1>
      <p>This data could have been loaded from the backend...</p>
    </div>
  );
}

function DemoHint() {
  return (
    <div className="RoseBox flex flex-col gap-y-8">
      <h1>⚠️ Demo 👀</h1>
      <ol className={"list-decimal"}>
        <li>
          Works only <b>in Chrome</b>
        </li>
        <li>
          Show source code <b>About</b>, <b>Info</b> and <b>DataComponent</b>
        </li>
      </ol>
    </div>
  );
}
