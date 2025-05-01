import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import SettingsForm from "../components/SettingsForm.tsx";
import { getUserSettingsOptions } from "../user-queries.ts";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  // Zeigen: die Daten kommen aus dem Cache!
  //  Navigation Home -> Settings -> Home -> Settings
  //  Dev Tools einschalten

  const { data } = useSuspenseQuery(getUserSettingsOptions("1"));

  const navigate = useNavigate();

  return (
    <div className={"MatchPageLayout"}>
      <SettingsForm
        initialMatchesPerLeague={data.matchesPerLeague}
        initialName={data.name}
        initialLeagueIds={data.leagueIds}
        onSaved={() =>
          navigate({
            to: "/",
          })
        }
      />
      <Link to={"/"}>Home</Link>
    </div>
  );
}
