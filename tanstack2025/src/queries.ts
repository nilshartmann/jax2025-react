import ky from "ky";
import { queryOptions } from "@tanstack/react-query";
import { CardDto, CardDtoList, CommentDtoList } from "@/types";

export const fetchCardListOpts = () =>
  queryOptions({
    queryKey: ["cards", "list"],
    async queryFn() {
      const r = await ky.get("http://localhost:7100/cards").json();
      return CardDtoList.parse(r);
    },
  });

export const fetchCardDetailOpts = (cardId: string) =>
  queryOptions({
    queryKey: ["cards", "detail", cardId],
    async queryFn() {
      const r = await ky.get(`http://localhost:7100/cards/${cardId}`).json();
      return CardDto.parse(r);
    },
  });

export async function fetchComments(cardId: string) {
  const r = await ky
    .get(`http://localhost:7100/cards/${cardId}/comments`)
    .json();
  return CommentDtoList.parse(r);
}

export async function saveLike(cardId: string) {
  const r = await ky
    .post(`http://localhost:7100/cards/${cardId}/likes?slow=2400`)
    .json();
  return CardDto.parse(r);
}
