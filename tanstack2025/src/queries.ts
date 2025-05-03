import _ky from "ky";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CardDto, CardDtoList, CommentDtoList } from "@/types";

const ky = _ky.extend({
  retry: 0,
  timeout: 30000,
});

export const fetchCardListOpts = () =>
  queryOptions({
    queryKey: ["cards", "list"],
    async queryFn() {
      const r = await ky.get("http://localhost:7100/cards").json();
      return CardDtoList.parse(r);
    },
  });

const loadCard = createServerFn({
  method: "GET",
})
  .validator((s) => z.string().parse(s))
  .handler(async ({ data: cardId }) => {
    console.log("Loading Card on server ", cardId);
    const r = await ky
      .get(`http://localhost:7100/cards/${cardId}?slow=1000`)
      .json();
    return CardDto.parse(r);
  });

export const fetchCardDetailOpts = (cardId: string) =>
  queryOptions({
    queryKey: ["cards", "detail", cardId],
    async queryFn() {
      console.log("fetchCardDetailOpts", cardId);
      return loadCard({ data: cardId });
    },
  });

export const fetchCommentsOpts = (cardId: string) =>
  queryOptions({
    queryKey: ["cards", "detail", cardId, "comments"],
    async queryFn() {
      const r = await ky
        .get(`http://localhost:7100/cards/${cardId}/comments?slow=10000`)
        .json();
      return CommentDtoList.parse(r);
    },
  });
