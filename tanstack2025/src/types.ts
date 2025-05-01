import { z } from "zod";

// export type Match = {
//   id: string;
//
//   matchDay: string;
//
//   homeTeam: string;
//   awayTeam: string;
//
//   homeGoals: number;
//   awayGoals: number;
// };

const Match = z.object({
  id: z.string(),
  matchDay: z.string(),

  homeTeam: z.string(),
  awayTeam: z.string(),
  homeGoals: z.number().min(0),
  awayGoals: z.number().min(0),
});
export type Match = z.infer<typeof Match>;

const League = z.object({
  id: z.string(),
  name: z.string(),
});

export type League = z.infer<typeof League>;

export const GetMyMatchDaysResponse = z
  .object({
    league: League,
    matches: Match.array(),
  })
  .array();

export const UserSettings = z.object({
  id: z.string(),
  name: z.string(),
  leagueIds: z.string().array(),
  matchesPerLeague: z.number().min(0),
});
