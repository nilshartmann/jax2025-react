import { queryOptions } from "@tanstack/react-query";
import ky from "ky";

import { UserSettings } from "./types.ts";

export const getUserSettingsOptions = (userId: string) =>
  queryOptions({
    queryKey: ["users", userId, "settings"],
    async queryFn() {
      const response = await ky
        .get(`http://localhost:7100/api/users/${userId}`)
        .json();
      return UserSettings.parseAsync(response);
    },
  });
