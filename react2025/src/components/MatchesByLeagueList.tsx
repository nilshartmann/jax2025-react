import { League, Match } from "../types.ts";
import MatchRow from "./MatchRow.tsx";

// "interner" Typ, deswegen nicht in der types.ts-Datei
type MatchesByLeague = {
  league: League;
  matches: Match[];
};

type MatchesByLeagueListProps = {
  title?: string;
  matchesByLeagueList: MatchesByLeague[];
};

export default function MatchesByLeagueList({
  title = "My Leagues",
  matchesByLeagueList,
}: MatchesByLeagueListProps) {
  return (
    <>
      <h1 className={"PageTitle"}>{title}</h1>
      {matchesByLeagueList.map((matchesByLeague) => (
        <section key={matchesByLeague.league.id} className={"MatchGroup"}>
          <h2>{matchesByLeague.league.name}</h2>
          {matchesByLeague.matches.map((match) => (
            <MatchRow key={match.id} match={match} />
          ))}
        </section>
      ))}
    </>
  );
}
