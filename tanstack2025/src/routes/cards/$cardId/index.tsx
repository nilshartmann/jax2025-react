import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchCardDetailOpts,
  fetchCardListOpts,
  fetchCommentsOpts,
} from "@/queries.ts";
import Card from "@/components/Card.tsx";
import CardDetail from "@/components/CardDetail.tsx";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";

export const Route = createFileRoute("/cards/$cardId/")({
  component: RouteComponent,

  // pendingComponent wird nur gerendert,
  //  wenn auf useSuspenseQuery gewartet wird
  //   -> das passiert nur, wenn der Loader _kein_
  //      Promise zurückliefert
  //      -> dann läuft der Call nämlich noch, wenn
  //         useSuspenseQuery in der Komponente
  //         ausgeführt wird
  pendingComponent: () => (
    <LoadingIndicator>Card is loading...</LoadingIndicator>
  ),
  loader({ context, params }) {
    // Wenn aus dem loader ein Promise zurückgeliefert wird,
    // wird Serverseitig gewartet, bis das Promise aufgelöst ist
    // die Seite wird dann also vollständig SSR'ed
    //

    // hier wollen wir nicht warten, nur das Laden beginnen
    context.queryClient.ensureQueryData(fetchCommentsOpts(params.cardId));

    // wir wollen auf dem Server warten bis die Artikel-Details gerendert wurden
    return context.queryClient.ensureQueryData(
      fetchCardDetailOpts(params.cardId),
    );
  },
});

function RouteComponent() {
  const { cardId } = Route.useParams();

  const { data: card } = useSuspenseQuery(fetchCardDetailOpts(cardId));

  return <CardDetail card={card} />;
}
