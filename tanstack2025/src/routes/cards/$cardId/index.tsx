import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCardDetailOpts } from "@/queries.ts";
import CardDetail from "@/components/CardDetail.tsx";

export const Route = createFileRoute("/cards/$cardId/")({
  component: RouteComponent,
  loader({ context, params }) {
    return context.queryClient.ensureQueryData(
      fetchCardDetailOpts(params.cardId),
    );
  },
});

function RouteComponent() {
  const cardId = Route.useParams().cardId;

  const { data: card } = useSuspenseQuery(fetchCardDetailOpts(cardId));

  return <CardDetail card={card} />;
}
