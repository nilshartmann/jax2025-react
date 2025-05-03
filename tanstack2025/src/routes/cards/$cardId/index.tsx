import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCardDetailOpts, fetchCardListOpts } from "@/queries.ts";
import Card from "@/components/Card.tsx";
import CardDetail from "@/components/CardDetail.tsx";

export const Route = createFileRoute("/cards/$cardId/")({
  component: RouteComponent,
  loader({ context, params }) {
    context.queryClient.ensureQueryData(fetchCardDetailOpts(params.cardId));
  },
});

function RouteComponent() {
  const { cardId } = Route.useParams();

  const { data: card } = useSuspenseQuery(fetchCardDetailOpts(cardId));

  return <CardDetail card={card} />;
}
