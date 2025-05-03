import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cards/$cardId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const cardId = Route.useParams().cardId;
  //                                 ^--- typesafe!

  return <div>Hello "/cards/$cardId/"! Card-Id {cardId}</div>;
}
