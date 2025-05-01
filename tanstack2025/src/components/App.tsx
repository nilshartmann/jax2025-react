import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";

import { GetMyMatchDaysResponse } from "../types.ts";
import MatchesByLeagueList from "./MatchesByLeagueList.tsx";
import SettingsForm from "./SettingsForm.tsx";

export default function App() {
  // Diese App-Komponente hier ist unser "Spielplatz",
  // um die Komponenten auszuprobieren, die wir Schritt-für-Schritt
  // entwickeln.
  //
  // Später werden wir sie gegen Router-basierte Komponenten
  // austauschen.

  // const sampleMatch: Match = {
  //   id: "m1",
  //   matchDay: "24. Spieltag",
  //   homeTeam: "Hamburger SV",
  //   awayTeam: "1. FC Nürnberg",
  //   homeGoals: 3,
  //   awayGoals: 2,
  // };
  //
  // const sampleMatch2: Match = {
  //   id: "m2",
  //   matchDay: "24. Spieltag",
  //   homeTeam: "1. FC Köln",
  //   awayTeam: "MSV Duisburg",
  //   homeGoals: 0,
  //   awayGoals: 1,
  // };

  // const matchesByLeague = generateDummyMatchItems(["bl1", "ucl24"], 9);

  const { data } = useSuspenseQuery({
    queryKey: ["users", "1", "my-matchdays"],
    async queryFn() {
      const response = await ky
        .get("http://localhost:7100/api/users/1/my-matchdays?fail")
        .json();

      // Fehler auf der Konsole ansehen!

      return GetMyMatchDaysResponse.parseAsync(response);
    },
  });

  return (
    <div className={"container mx-auto pt-8"}>
      <MatchesByLeagueList matchesByLeagueList={data} />
      <SettingsForm />
    </div>
  );
}
