import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Suspense,
  unstable_Activity as Activity,
  useEffect,
  useState,
} from "react";

export default function ActivityDemo() {
  const [activeView, setActiveView] = useState<"A" | "B">("A");
  const [counterApp, setCounterApp] = useState(0);

  const newView = activeView === "A" ? "B" : "A";

  return (
    <div className={"container mx-auto flex flex-col space-y-8"}>
      <button onClick={() => setActiveView(newView)}>
        Active: {activeView}, Activate: {newView}
      </button>
      <button onClick={() => setCounterApp((c) => c + 1)}>
        Counter: {counterApp} increase
      </button>

      <button
        onClick={() => {
          document.getElementById("buttonB")!.click();
        }}
      >
        Click B
      </button>

      <Activity mode={activeView === "A" ? "visible" : "hidden"}>
        <A />
      </Activity>
      <Suspense fallback={<h1>Loading B...</h1>}>
        <Activity mode={activeView === "B" ? "visible" : "hidden"}>
          <B />
        </Activity>
      </Suspense>
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
    <div className={"flex gap-x-8 rounded-xl border-gray-200 p-4"}>
      <title>A Component</title>
      <div className={"font-bold"}>A</div>
      <button onClick={() => setCounterA(counterA + 1)}>
        {counterA} increase
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

  useSuspenseQuery({
    queryKey: ["b", counterB],
    queryFn() {
      console.log("Reading Data in B ", counterB);
      return new Promise((res) => {
        setTimeout(() => res("huhu"), 5000);
      });
    },
  });

  return (
    <div className={"flex gap-x-8 rounded-xl border-gray-200 p-4"}>
      <title>B Component</title>
      <div className={"font-bold"}>B</div>
      <button id="buttonB" onClick={() => setCounterB(counterB + 1)}>
        {counterB} increase
      </button>
    </div>
  );
}
