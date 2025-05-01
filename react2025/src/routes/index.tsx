import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import ky from "ky";
import { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import LoadingIndicator from "../components/LoadingIndicator.tsx";
import MatchesByLeagueList from "../components/MatchesByLeagueList.tsx";
import { GetMyMatchDaysResponse } from "../types.ts";
import { getUserSettingsOptions } from "../user-queries.ts";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function MyErrorBoundary(props: FallbackProps) {
  return (
    <div>
      <h1>Error!</h1>
      {props.error.toString()}
      <button onClick={() => props.resetErrorBoundary()}>Retry!</button>
    </div>
  );
}

function RouteComponent() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary FallbackComponent={MyErrorBoundary} onReset={reset}>
      <Suspense fallback={<LoadingIndicator />}>
        <RouteComponentInternal />
      </Suspense>
    </ErrorBoundary>
  );
}

function RouteComponentInternal() {
  const { data: userSettings } = useSuspenseQuery(getUserSettingsOptions("1"));

  const { data } = useSuspenseQuery({
    queryKey: ["users", "1", "my-matchdays"],
    async queryFn() {
      const response = await ky
        // NAVIGIEREN UND CACHE VERHALTEN:
        //
        //  1. Home -> Settings -> Zurück zu Home über "Home"-Button!
        //  2. Home -> Settings -> Speichern -> WAAAAARTEN....
        //    -> Loading machen wir im nächsten Schritt
        .get("http://localhost:7100/api/users/1/my-matchdays?slowdown=3000")
        .json();

      // Fehler auf der Konsole ansehen!

      return GetMyMatchDaysResponse.parseAsync(response);
    },
  });
  return (
    <div>
      <h1>Welcome, {userSettings.name}</h1>
      <MatchesByLeagueList matchesByLeagueList={data} />
      <Link to={"/settings"}>Settings!</Link>
    </div>
  );
}
