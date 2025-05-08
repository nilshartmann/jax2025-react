import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCardDetailOpts } from "@/queries.ts";
import CardDetail from "@/components/CardDetail.tsx";

export const Route = createFileRoute("/cards/$cardId/")({
  component: RouteComponent,
  loader({ context, params }) {
    // Jetzt wartet der Server bis die Daten aus dem LOADER
    // vorhanden sind
    //  -> damit können wir steuern, was/bis wo SSR'ed werden soll
    //  -> ginge jetzt auch ohne JavaScript
    return context.queryClient.ensureQueryData(
      fetchCardDetailOpts(params.cardId),
    );
  },
});

function RouteComponent() {
  const cardId = Route.useParams().cardId;
  //                                 ^--- typesafe!

  const { data: card } = useSuspenseQuery(fetchCardDetailOpts(cardId));

  return <CardDetail card={card} />;
}
