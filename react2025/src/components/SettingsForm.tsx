import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { useState } from "react";

import { __dummy_leagues, generateDummyMatchItems } from "../dummy-data.ts";
import MatchesByLeagueList from "./MatchesByLeagueList.tsx";
import MultiSelect from "./MultiSelect.tsx";

type SettingsFormProps = {
  initialName?: string;
  initialMatchesPerLeague?: number;
  initialLeagueIds?: string[];

  // simplifiert, nicht unbedingt beste API
  onSaved?: () => void;
};

export default function SettingsForm({
  initialName = "",
  initialLeagueIds = [],
  initialMatchesPerLeague = 2,
  onSaved,
}: SettingsFormProps) {
  const [name, setName] = useState(initialName);
  const [matchesPerLeague, setMatchesPerLeague] = useState(
    initialMatchesPerLeague,
  );
  const [leagueIds, setLeagueIds] = useState<string[]>(initialLeagueIds);

  // Was spricht dafür, was dagegen die Mutation hier zu machen
  //  und nicht eine onSave-Callback-Funktion zu haben?
  //  Nachteil: komplizierter zu testen
  //  Nachteil: schwerer wiederzuverwenden
  //  Vorteil: bei der Mutation "außerhalb" muss man diverse Informationen
  //    reinreichen (Mutation läuft, Fehler, Erfolg, ...)

  const queryClient = useQueryClient();

  const saveSettingsMutation = useMutation({
    async mutationFn() {
      const response = await ky
        .put("http://localhost:7100/api/users/1", {
          json: {
            name,
            matchesPerLeague,
            leagueIds,
          },
        })
        .json();

      // Wir kümmern uns hier (noch) nicht um das Ergebnis
      return response;
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ["users"],
      });
    },
  });

  const handleSave = async () => {
    console.log("SAVE...", name, matchesPerLeague, leagueIds);

    await saveSettingsMutation.mutateAsync();

    if (onSaved) {
      onSaved();
    }
  };

  const handleMatchesPerLeagueChange = (newValueString: string) => {
    const newValue = Number(newValueString);
    if (newValue >= 0) {
      setMatchesPerLeague(newValue);
    }
  };

  return (
    <div className={"MatchPageLayout"}>
      <h1 className={"PageTitle"}>Settings</h1>
      <form className={"SettingsForm"}>
        <label htmlFor={"nameInput"}>Your name:</label>
        <input
          type={"text"}
          id={"nameInput"}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {name.length < 4 && (
          <p className={"col-start-2 text-rose-500"}>
            Please enter a name with at least four chars
          </p>
        )}

        <label htmlFor={"matchesPerLeagueInput"}>Matches per League:</label>
        <input
          id={"matchesPerLeagueInput"}
          type={"number"}
          step={1}
          onChange={(e) => handleMatchesPerLeagueChange(e.currentTarget.value)}
          value={matchesPerLeague}
        />

        <label className={"self-start"}>Your leagues</label>
        <MultiSelect
          options={__dummy_leagues}
          selectedIds={leagueIds}
          onSelectionChange={(newIds) => setLeagueIds(newIds)}
        />
      </form>
      <button
        type="button"
        className={"SubmitButton"}
        onClick={() => handleSave()}
      >
        Save
      </button>
      {saveSettingsMutation.isError && (
        <p className={"text-rose-500"}>
          Saving failed! ({String(saveSettingsMutation.error)})
        </p>
      )}
      {saveSettingsMutation.isSuccess && (
        <p className={"text-green-600"}>User Settings saved!</p>
      )}

      <MatchesByLeagueList
        title={`${name}'s Leagues`}
        matchesByLeagueList={generateDummyMatchItems(
          leagueIds,
          matchesPerLeague,
        )}
      />
    </div>
  );
}
