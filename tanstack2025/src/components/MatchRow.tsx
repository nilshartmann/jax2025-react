import { Match } from "../types.ts";

type MatchRowProps = {
  match: Match;
};

export default function MatchRow({ match }: MatchRowProps) {
  const homeTeamClassName =
    match.homeGoals > match.awayGoals ? "font-bold" : "";
  const awayTeamClassName =
    match.homeGoals < match.awayGoals ? "font-bold" : "";

  return (
    <div className={"MatchRow"}>
      <div>{match.matchDay}</div>
      <div>
        <span className={homeTeamClassName}>{match.homeTeam}</span> -{" "}
        <span className={awayTeamClassName}>{match.awayTeam}</span>
      </div>
      <div>
        {match.homeGoals} : {match.awayGoals}
      </div>
    </div>
  );
}
