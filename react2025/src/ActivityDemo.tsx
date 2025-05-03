import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Suspense,
  unstable_Activity as Activity,
  useEffect,
  useState,
} from "react";

import { dummyFetch } from "./dummy-fetch.ts";
import { logger } from "./log.ts";

// prevent Activity from beeing removed from imports when not used
const x = Activity;

type TabName = "A" | "B";

export default function ActivityDemo() {
  const [activeTab, setActiveTab] = useState<TabName | null>(null);

  const [counter, setCounter] = useState(0);

  const increaseCounter = () => setCounter((c) => c + 1);

  const btnClassName = (tab: string) =>
    activeTab === tab ? "active" : undefined;

  return (
    <main>
      <button onClick={increaseCounter}>
        Local Counter: {counter} increase
      </button>

      <div className={"ButtonBar"}>
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
    </main>
  );
}

function A() {
  const log = logger("Component A");
  const [counterA, setCounterA] = useState(0);

  log("Rendering");

  useEffect(() => {
    log("useEffect executed");
  });

  return (
    <div className={"BlueBox"}>
      <h1>Component A</h1>
      <button onClick={() => setCounterA(counterA + 1)}>
        Local Counter in A: {counterA}
      </button>
    </div>
  );
}

function B() {
  const log = logger("Component B");
  const [counterB, setCounterB] = useState(0);

  log("Rendering");

  useEffect(() => {
    log("useEffect executed");
  });

  const { data } = useSuspenseQuery({
    queryKey: ["B"],
    async queryFn() {
      log("Fetching Data in Suspense Query");
      const result = await dummyFetch(4200);
      log("Fetching Data in Suspense Query ... DONE");
      return result;
    },
  });

  return (
    <div className={"TealBox"}>
      <h1>Component B</h1>
      <div>{data}</div>
      <button id="buttonB" onClick={() => setCounterB(counterB + 1)}>
        Local Couter in B: {counterB}
      </button>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="PurpleBox">
      <h1>Loading Data...</h1>
    </div>
  );
}

function DemoHint() {
  return (
    <div className="RoseBox flex flex-col gap-y-8">
      <h1>⚠️ Demo 👀</h1>
      <ol className={"list-decimal"}>
        <li>
          Show source code <b>Component A</b> and <b>Component B</b>
        </li>
        <li>Open console to see what (not) happens</li>
      </ol>
    </div>
  );
}
