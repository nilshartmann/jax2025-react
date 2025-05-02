import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Suspense,
  unstable_Activity as Activity,
  useEffect,
  useState,
} from "react";

type TabName = "A" | "B";
export default function ActivityDemo() {
  const [activeTab, setActiveTab] = useState<TabName | null>(null);

  // Changing the global counter reveals that all children
  // are re-rendered (even the "hidden" ones)
  const [counterApp, setCounterApp] = useState(0);

  const btnClassName = (tab: string) =>
    activeTab === tab ? "active" : undefined;

  return (
    <div className={"container mx-auto flex flex-col space-y-8"}>
      <button onClick={() => setCounterApp((c) => c + 1)}>
        Local Counter: {counterApp} increase
      </button>

      <div className={"flex justify-center space-x-4 border-gray-300 p-2"}>
        <button className={btnClassName("A")} onClick={() => setActiveTab("A")}>
          A (simple component with local State)
        </button>
        <button className={btnClassName("B")} onClick={() => setActiveTab("B")}>
          B (component with Suspense)
        </button>
      </div>

      {activeTab === null && <DemoHint />}

      <Activity mode={activeTab === "A" ? "visible" : "hidden"}>
        <A />
      </Activity>

      <Suspense fallback={<LoadingFallback />}>
        <Activity mode={activeTab === "B" ? "visible" : "hidden"}>
          <B />
        </Activity>
      </Suspense>
    </div>
  );
}

function DemoHint() {
  return (
    <div className="flex items-center justify-center gap-x-8 rounded-xl border-2 border-rose-600 bg-rose-200 p-8 tracking-wide text-rose-600">
      <h1>⚠️ Open console to see what's happening 👀</h1>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center gap-x-8 rounded-xl border-2 border-purple-600 bg-purple-200 p-8">
      <h1>Loading Data...</h1>
    </div>
  );
}

function A() {
  const [counterA, setCounterA] = useState(0);

  console.log("Render A", new Date().toLocaleTimeString());

  useEffect(() => {
    console.log("Effect A");

    return () => {
      console.log("Clean-up Effect A");
    };
  });

  return (
    <div
      className={
        "flex items-center gap-x-8 rounded-xl border-2 border-blue-600 bg-blue-200 p-8"
      }
    >
      <div className={"font-bold"}>Component A</div>
      <button onClick={() => setCounterA(counterA + 1)}>
        Local Counter in A: {counterA}
      </button>
    </div>
  );
}

function B() {
  const [counterB, setCounterB] = useState(0);

  console.log("Render B", new Date().toLocaleTimeString());

  useEffect(() => {
    console.log("Effect B");

    return () => {
      console.log("Clean-up Effect B");
    };
  });

  useDemoSuspenseQuery(["B", counterB]);

  return (
    <div
      className={
        "flex items-center gap-x-8 rounded-xl border-2 border-teal-600 bg-teal-200 p-8"
      }
    >
      <div className={"font-bold"}>Component B</div>
      <button id="buttonB" onClick={() => setCounterB(counterB + 1)}>
        Local Couter in B: {counterB}
      </button>
    </div>
  );
}

function useDemoSuspenseQuery(keys: Array<string | number>, duration = 5000) {
  return useSuspenseQuery({
    queryKey: [keys],
    queryFn() {
      console.log("Simulating Suspense Query with keys  ", keys);
      return new Promise((res) => {
        setTimeout(() => res("huhu"), duration);
      });
    },
  });
}
